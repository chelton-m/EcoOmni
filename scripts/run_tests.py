#!/usr/bin/env python3
"""
Docker test runner script.
This script runs the authentication tests inside the Docker container.
"""

import subprocess
import sys
import os

def run_tests():
    """Run the authentication tests."""
    print("Running authentication tests in Docker container...")
    print("=" * 50)
    
    try:
        # Run pytest with verbose output
        result = subprocess.run([
            sys.executable, "-m", "pytest", 
            "tests/test_auth.py", 
            "-v", 
            "--tb=short"
        ], capture_output=False, text=True)
        
        if result.returncode == 0:
            print("\n" + "=" * 50)
            print("✅ All tests passed successfully!")
        else:
            print("\n" + "=" * 50)
            print("❌ Some tests failed!")
            sys.exit(1)
            
    except Exception as e:
        print(f"Error running tests: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
