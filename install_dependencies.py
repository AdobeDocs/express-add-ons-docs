#!/usr/bin/env python3
"""
Interactive Dependency Installer for Adobe Express Add-ons Documentation Testing Scripts
=============================================================================================

This script helps you install the right dependencies based on which tools you want to use.
"""

import os
import sys
import subprocess

def run_command(cmd):
    """Run a shell command and return success status."""
    try:
        result = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {cmd}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed: {cmd}")
        print(f"Error: {e.stderr}")
        return False

def main():
    print("🚀 Adobe Express Add-ons Documentation Testing - Dependency Installer")
    print("=" * 70)
    
    # Check if we're in the right directory
    required_files = ["scripts", "src", "test_prompts", "requirements-complete.txt"]
    missing_files = [f for f in required_files if not os.path.exists(f)]
    
    if missing_files:
        print("❌ ERROR: You must run this script from the express-add-ons-docs root directory!")
        print(f"Missing: {', '.join(missing_files)}")
        print("\n🔧 Solution:")
        print("cd /path/to/your/express-add-ons-docs")
        print("python3 install_dependencies.py")
        return
    
    print("✅ Correct directory detected: express-add-ons-docs root")
    
    print("\nWhich tools do you want to use? Choose an option:")
    print("1. 🎯 Basic testing only (rule-based, fast)")
    print("2. 🧠 AI-powered testing only (requires API key)")  
    print("3. 🔧 Everything (complete functionality)")
    print("4. 📋 Show me what each option installs")
    
    choice = input("\nEnter choice (1-4): ").strip()
    
    if choice == "4":
        print("\n📋 Installation Options:")
        print("\n🎯 Option 1 - Basic Tools:")
        print("   • PyYAML>=6.0 (YAML file parsing)")
        print("   • pandas>=1.5.0 (data analysis and CSV generation)")
        print("   • Enables: prompt_only_basic_tester.py, ground_truth_tester.py,")
        print("     doc_audit_runner_v2.py, llm_readiness_analyzer.py, llm_linter.py,")
        print("     basicAudit.py, and all reporter scripts")
        
        print("\n🧠 Option 2 - AI-Powered Tools:")
        print("   • openai>=1.10.0 (Azure OpenAI integration)")
        print("   • PyYAML>=6.0 (YAML parsing)")
        print("   • asyncio-throttle>=1.0.2 (API rate limiting)")
        print("   • dataclasses-json>=0.6.0 (advanced serialization)")
        print("   • Enables: prompt_only_llm_tester.py, prompt_only_multi_agent_tester.py")
        print("   • ⚠️  Requires Azure OpenAI API key")
        
        print("\n🔧 Option 3 - Everything:")
        print("   • All dependencies from options 1 and 2")
        print("   • Enables ALL scripts in scripts/ folder")
        
        return main()  # Ask again
    
    elif choice == "1":
        print("\n🎯 Installing basic testing dependencies...")
        packages = ["PyYAML>=6.0", "pandas>=1.5.0"]
        
    elif choice == "2":
        print("\n🧠 Installing AI-powered testing dependencies...")
        packages = ["openai>=1.10.0", "PyYAML>=6.0", "asyncio-throttle>=1.0.2", "dataclasses-json>=0.6.0"]
        
    elif choice == "3":
        print("\n🔧 Installing ALL dependencies...")
        if os.path.exists("requirements-complete.txt"):
            print("Using requirements-complete.txt file...")
            success = run_command("pip install -r requirements-complete.txt")
            if success:
                print("\n✅ All dependencies installed successfully!")
                print("\n🔑 For AI tools, don't forget to set your API key:")
                print("export OPENAI_API_KEY='your-azure-openai-api-key'")
            else:
                print("\n❌ Installation failed. Try manual installation:")
                print("pip install PyYAML pandas openai asyncio-throttle dataclasses-json")
            return
        else:
            packages = ["PyYAML>=6.0", "pandas>=1.5.0", "openai>=1.10.0", "asyncio-throttle>=1.0.2", "dataclasses-json>=0.6.0"]
    
    else:
        print("❌ Invalid choice. Please run the script again.")
        return
    
    # Install packages individually
    success_count = 0
    for package in packages:
        if run_command(f"pip install {package}"):
            success_count += 1
    
    print(f"\n📊 Installation Summary: {success_count}/{len(packages)} packages installed successfully")
    
    if success_count == len(packages):
        print("✅ Installation completed successfully!")
        
        if choice in ["2", "3"]:
            print("\n🔑 Next step: Set up your Azure OpenAI API key")
            print("export OPENAI_API_KEY='your-azure-openai-api-key'")
            
        print("\n🧪 Test your installation:")
        if choice in ["1", "3"]:
            print("python3 scripts/prompt_only_basic_tester.py --help")
        if choice in ["2", "3"]:
            print("python3 scripts/prompt_only_llm_tester.py --help")
            
    else:
        print("⚠️  Some packages failed to install. You may need to:")
        print("1. Check your Python version (requires 3.8+)")
        print("2. Update pip: pip install --upgrade pip")
        print("3. Try manual installation")

if __name__ == "__main__":
    main()
