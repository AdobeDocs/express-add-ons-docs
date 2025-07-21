#!/usr/bin/env python3
"""
Query Parser for Adobe Express Add-ons Documentation Testing

Parses multiple query formats from test_prompts/ folder:
- benchmarking_prd_queries (text format)
- llm-test-queries.yaml (structured YAML)
- unlabelled_queries.yaml (categorized YAML)
- structured_query_data.json (comprehensive JSON)

Converts all to unified format for documentation testing.
"""

import json
import yaml
import re
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
from datetime import datetime


@dataclass
class UnifiedQuery:
    """Standardized query format for testing"""
    query: str
    category: str
    subcategory: Optional[str] = None
    priority: str = "medium"
    expected_elements: List[str] = None
    common_errors: List[str] = None
    source_file: str = ""
    metadata: Dict[str, Any] = None

    def __post_init__(self):
        if self.expected_elements is None:
            self.expected_elements = []
        if self.common_errors is None:
            self.common_errors = []
        if self.metadata is None:
            self.metadata = {}


class QueryParser:
    """Unified parser for all query formats"""
    
    def __init__(self, test_prompts_dir: str = "test_prompts"):
        self.test_prompts_dir = Path(test_prompts_dir)
        self.unified_queries: List[UnifiedQuery] = []
        
    def parse_all_sources(self) -> List[UnifiedQuery]:
        """Parse all query sources and return unified format"""
        self.unified_queries = []
        
        # Parse each source file
        sources = {
            'benchmarking_prd_queries': self._parse_benchmarking_queries,
            'llm-test-queries.yaml': self._parse_llm_test_yaml,
            'unlabelled_queries.yaml': self._parse_unlabelled_yaml,
            'structured_query_data.json': self._parse_structured_json
        }
        
        for filename, parser_func in sources.items():
            file_path = self.test_prompts_dir / filename
            if file_path.exists():
                try:
                    queries = parser_func(file_path)
                    self.unified_queries.extend(queries)
                    print(f"✅ Parsed {len(queries)} queries from {filename}")
                except Exception as e:
                    print(f"❌ Error parsing {filename}: {e}")
            else:
                print(f"⚠️ File not found: {filename}")
        
        print(f"\n📊 Total queries parsed: {len(self.unified_queries)}")
        return self.unified_queries
    
    def _parse_benchmarking_queries(self, file_path: Path) -> List[UnifiedQuery]:
        """Parse benchmarking_prd_queries text format"""
        queries = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split by categories based on headers
        sections = re.split(r'\n(?=[A-Z][a-z]+ [A-Z])', content)
        
        for section in sections:
            if not section.strip():
                continue
                
            lines = section.strip().split('\n')
            if not lines:
                continue
                
            # First line is category
            category = lines[0].strip().lower().replace(' ', '_')
            
            # Extract quoted queries
            for line in lines[1:]:
                if line.strip().startswith('"') and line.strip().endswith('"'):
                    query_text = line.strip()[1:-1]  # Remove quotes
                    
                    queries.append(UnifiedQuery(
                        query=query_text,
                        category=category,
                        priority="high",  # All benchmarking queries are high priority
                        source_file="benchmarking_prd_queries",
                        metadata={"source_type": "benchmarking", "format": "text"}
                    ))
        
        return queries
    
    def _parse_llm_test_yaml(self, file_path: Path) -> List[UnifiedQuery]:
        """Parse llm-test-queries.yaml structured format"""
        queries = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        test_queries = data.get('test_queries', [])
        
        for item in test_queries:
            queries.append(UnifiedQuery(
                query=item['query'],
                category=item['category'],
                expected_elements=item.get('expected_elements', []),
                priority="high",  # Structured test queries are high priority
                source_file="llm-test-queries.yaml",
                metadata={
                    "source_type": "structured_test",
                    "format": "yaml",
                    "has_expected_elements": len(item.get('expected_elements', [])) > 0
                }
            ))
        
        return queries
    
    def _parse_unlabelled_yaml(self, file_path: Path) -> List[UnifiedQuery]:
        """Parse unlabelled_queries.yaml categorized format"""
        queries = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        for category, prompts in data.items():
            for prompt_item in prompts:
                queries.append(UnifiedQuery(
                    query=prompt_item['prompt'],
                    category=category.lower(),
                    priority="medium",
                    source_file="unlabelled_queries.yaml",
                    metadata={
                        "source_type": "unlabelled",
                        "format": "yaml",
                        "original_category": category
                    }
                ))
        
        return queries
    
    def _parse_structured_json(self, file_path: Path) -> List[UnifiedQuery]:
        """Parse structured_query_data.json comprehensive format"""
        queries = []
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        query_categories = data.get('query_categories', {})
        
        for category, category_data in query_categories.items():
            priority = category_data.get('priority', 'medium')
            subcategories = category_data.get('subcategories', {})
            common_errors = category_data.get('common_errors', [])
            
            for subcategory, query_list in subcategories.items():
                for query_text in query_list:
                    queries.append(UnifiedQuery(
                        query=query_text,
                        category=category,
                        subcategory=subcategory,
                        priority=priority,
                        common_errors=common_errors,
                        source_file="structured_query_data.json",
                        metadata={
                            "source_type": "structured_analysis",
                            "format": "json",
                            "frequency_percentage": category_data.get('frequency_percentage'),
                            "documentation_gaps": category_data.get('documentation_gaps', [])
                        }
                    ))
        
        return queries
    
    def get_queries_by_category(self, category: str) -> List[UnifiedQuery]:
        """Get all queries for a specific category"""
        return [q for q in self.unified_queries if q.category == category]
    
    def get_high_priority_queries(self) -> List[UnifiedQuery]:
        """Get all high priority queries"""
        return [q for q in self.unified_queries if q.priority == "high"]
    
    def get_queries_with_expected_elements(self) -> List[UnifiedQuery]:
        """Get queries that have expected elements for validation"""
        return [q for q in self.unified_queries if q.expected_elements]
    
    def export_unified_format(self, output_file: str = "unified_test_queries.json"):
        """Export all queries in unified JSON format"""
        export_data = {
            "metadata": {
                "total_queries": len(self.unified_queries),
                "export_date": datetime.now().isoformat(),
                "source_files": list(set(q.source_file for q in self.unified_queries)),
                "categories": list(set(q.category for q in self.unified_queries))
            },
            "queries": [asdict(q) for q in self.unified_queries],
            "statistics": self._generate_statistics()
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, ensure_ascii=False)
        
        print(f"📄 Exported {len(self.unified_queries)} queries to {output_file}")
        return output_file
    
    def _generate_statistics(self) -> Dict[str, Any]:
        """Generate statistics about parsed queries"""
        stats = {
            "by_category": {},
            "by_priority": {},
            "by_source": {},
            "with_expected_elements": 0,
            "with_common_errors": 0
        }
        
        for query in self.unified_queries:
            # Category stats
            stats["by_category"][query.category] = stats["by_category"].get(query.category, 0) + 1
            
            # Priority stats
            stats["by_priority"][query.priority] = stats["by_priority"].get(query.priority, 0) + 1
            
            # Source stats
            stats["by_source"][query.source_file] = stats["by_source"].get(query.source_file, 0) + 1
            
            # Feature stats
            if query.expected_elements:
                stats["with_expected_elements"] += 1
            if query.common_errors:
                stats["with_common_errors"] += 1
        
        return stats
    
    def print_summary(self):
        """Print a summary of parsed queries"""
        stats = self._generate_statistics()
        
        print("\n📊 QUERY PARSING SUMMARY")
        print("=" * 50)
        
        print(f"\n📈 Total Queries: {len(self.unified_queries)}")
        
        print(f"\n📂 By Category:")
        for category, count in sorted(stats["by_category"].items()):
            print(f"   {category}: {count}")
        
        print(f"\n⭐ By Priority:")
        for priority, count in sorted(stats["by_priority"].items()):
            print(f"   {priority}: {count}")
        
        print(f"\n📄 By Source:")
        for source, count in sorted(stats["by_source"].items()):
            print(f"   {source}: {count}")
        
        print(f"\n🎯 Special Features:")
        print(f"   With Expected Elements: {stats['with_expected_elements']}")
        print(f"   With Common Errors: {stats['with_common_errors']}")


def main():
    """Demo/test the query parser"""
    parser = QueryParser()
    
    # Parse all sources
    queries = parser.parse_all_sources()
    
    # Print summary
    parser.print_summary()
    
    # Export unified format
    parser.export_unified_format()
    
    # Show some examples
    print("\n🔍 EXAMPLE QUERIES BY CATEGORY")
    print("=" * 50)
    
    categories = list(set(q.category for q in queries))[:5]  # Show first 5 categories
    for category in categories:
        category_queries = parser.get_queries_by_category(category)
        print(f"\n📋 {category.upper()} ({len(category_queries)} queries):")
        for i, query in enumerate(category_queries[:3]):  # Show first 3 in each
            print(f"   {i+1}. {query.query}")
            if query.expected_elements:
                print(f"      Expected: {', '.join(query.expected_elements[:3])}")


if __name__ == "__main__":
    main() 