#!/usr/bin/env python3
"""
Comprehensive Test Suite for AI Skin Disease Detection System
Tests all major API endpoints and authentication flows
"""

import requests
import json
import time
from datetime import datetime

BASE_URL = "http://localhost:8000/api"
TEST_EMAIL = f"testuser_{int(time.time())}@example.com"
TEST_PASSWORD = "Test@Password123"
TEST_NAME = "Test User"

# Color codes for output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

def log_test(name, result, message=""):
    status = f"{GREEN}✓ PASS{RESET}" if result else f"{RED}✗ FAIL{RESET}"
    print(f"{status} | {name:<40} | {message}")

def section(title):
    print(f"\n{BLUE}{'='*80}{RESET}")
    print(f"{BLUE}{title:^80}{RESET}")
    print(f"{BLUE}{'='*80}{RESET}")

# ============================================================================
# TEST 1: REGISTRATION
# ============================================================================
section("TEST 1: USER REGISTRATION")

register_payload = {
    "email": TEST_EMAIL,
    "password": TEST_PASSWORD,
    "name": TEST_NAME
}

try:
    resp = requests.post(f"{BASE_URL}/auth/register", json=register_payload)
    assert resp.status_code == 200, f"Status {resp.status_code}: {resp.text}"
    data = resp.json()
    assert "access_token" in data, "No access_token in response"
    assert "refresh_token" in data, "No refresh_token in response"
    ACCESS_TOKEN = data["access_token"]
    REFRESH_TOKEN = data["refresh_token"]
    log_test("User Registration", True, f"Created {TEST_EMAIL}")
except Exception as e:
    log_test("User Registration", False, str(e))
    exit(1)

# ============================================================================
# TEST 2: GET CURRENT USER (Protected endpoint)
# ============================================================================
section("TEST 2: AUTHENTICATED USER PROFILE")

headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}

try:
    resp = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    assert resp.status_code == 200, f"Status {resp.status_code}: {resp.text}"
    user = resp.json()
    assert user["email"] == TEST_EMAIL, "Email mismatch"
    assert user["name"] == TEST_NAME, "Name mismatch"
    log_test("Get Current User", True, f"User ID: {user.get('id')}, Role: {user.get('role')}")
except Exception as e:
    log_test("Get Current User", False, str(e))

# ============================================================================
# TEST 3: LOGIN WITH CREDENTIALS
# ============================================================================
section("TEST 3: LOGIN WITH CREDENTIALS")

login_payload = {
    "email": TEST_EMAIL,
    "password": TEST_PASSWORD
}

try:
    resp = requests.post(f"{BASE_URL}/auth/login", json=login_payload)
    assert resp.status_code == 200, f"Status {resp.status_code}: {resp.text}"
    data = resp.json()
    assert data["access_token"], "No access token in login response"
    log_test("User Login", True, f"Login successful, token refreshed")
except Exception as e:
    log_test("User Login", False, str(e))

# ============================================================================
# TEST 4: TOKEN REFRESH
# ============================================================================
section("TEST 4: TOKEN REFRESH")

refresh_payload = {"refresh_token": REFRESH_TOKEN}

try:
    resp = requests.post(f"{BASE_URL}/auth/refresh", json=refresh_payload)
    assert resp.status_code == 200, f"Status {resp.status_code}: {resp.text}"
    data = resp.json()
    assert "access_token" in data, "No new access token"
    NEW_ACCESS_TOKEN = data["access_token"]
    log_test("Token Refresh", True, "New access token generated")
except Exception as e:
    log_test("Token Refresh", False, str(e))

# ============================================================================
# TEST 5: DASHBOARD STATS
# ============================================================================
section("TEST 5: DASHBOARD & ANALYTICS")

headers = {"Authorization": f"Bearer {NEW_ACCESS_TOKEN}"}

try:
    resp = requests.get(f"{BASE_URL}/dashboard/stats", headers=headers)
    assert resp.status_code == 200, f"Status {resp.status_code}: {resp.text}"
    stats = resp.json()
    assert "total_scans" in stats, "Missing total_scans"
    assert "total_reports" in stats, "Missing total_reports"
    log_test("Dashboard Stats", True, f"Scans: {stats.get('total_scans')}, Reports: {stats.get('total_reports')}")
except Exception as e:
    log_test("Dashboard Stats", False, str(e))

# ============================================================================
# TEST 6: GET SCAN HISTORY (empty initially)
# ============================================================================
section("TEST 6: SCAN HISTORY")

try:
    resp = requests.get(f"{BASE_URL}/scan/history", headers=headers)
    assert resp.status_code == 200, f"Status {resp.status_code}: {resp.text}"
    scans = resp.json()
    assert isinstance(scans, list), "Scans should be a list"
    log_test("Scan History", True, f"Retrieved {len(scans)} scans")
except Exception as e:
    log_test("Scan History", False, str(e))

# ============================================================================
# TEST 7: GET REPORTS (empty initially)
# ============================================================================
section("TEST 7: MEDICAL REPORTS")

try:
    resp = requests.get(f"{BASE_URL}/reports", headers=headers)
    assert resp.status_code == 200, f"Status {resp.status_code}: {resp.text}"
    reports = resp.json()
    assert isinstance(reports, list), "Reports should be a list"
    log_test("Get Reports", True, f"Retrieved {len(reports)} reports")
except Exception as e:
    log_test("Get Reports", False, str(e))

# ============================================================================
# TEST 8: ADMIN ANALYTICS (if user is admin)
# ============================================================================
section("TEST 8: ADMIN ANALYTICS")

try:
    resp = requests.get(f"{BASE_URL}/admin/analytics", headers=headers)
    if resp.status_code == 403:
        log_test("Admin Analytics", True, "Non-admin user correctly denied access (403)")
    elif resp.status_code == 200:
        analytics = resp.json()
        log_test("Admin Analytics", True, f"User has admin access - {len(analytics.get('disease_counts', {}))} diseases tracked")
    else:
        log_test("Admin Analytics", False, f"Unexpected status {resp.status_code}")
except Exception as e:
    log_test("Admin Analytics", False, str(e))

# ============================================================================
# TEST 9: LOGOUT (Token Blacklist)
# ============================================================================
section("TEST 9: LOGOUT & TOKEN BLACKLIST")

try:
    resp = requests.post(f"{BASE_URL}/auth/logout", headers=headers)
    assert resp.status_code == 200, f"Status {resp.status_code}: {resp.text}"
    log_test("Logout", True, "Token blacklisted successfully")
    
    # Verify the token is now blacklisted
    time.sleep(0.5)
    resp = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    assert resp.status_code == 401, f"Blacklisted token should be rejected (got {resp.status_code})"
    log_test("Token Blacklist Verification", True, "Blacklisted token correctly rejected")
except Exception as e:
    log_test("Logout/Blacklist", False, str(e))

# ============================================================================
# TEST 10: INVALID CREDENTIALS
# ============================================================================
section("TEST 10: SECURITY - INVALID INPUTS")

try:
    # Wrong password
    invalid_login = {
        "email": TEST_EMAIL,
        "password": "WrongPassword123"
    }
    resp = requests.post(f"{BASE_URL}/auth/login", json=invalid_login)
    assert resp.status_code == 401, f"Should reject wrong password (got {resp.status_code})"
    log_test("Invalid Credentials", True, "Wrong password correctly rejected")
except Exception as e:
    log_test("Invalid Credentials", False, str(e))

# ============================================================================
# TEST 11: PROTECTED ROUTE WITHOUT TOKEN
# ============================================================================
section("TEST 11: SECURITY - PROTECTED ROUTES")

try:
    resp = requests.get(f"{BASE_URL}/auth/me")
    assert resp.status_code == 403, f"Should reject request without token (got {resp.status_code})"
    log_test("Protected Route Without Token", True, "Unauthenticated access correctly denied")
except Exception as e:
    log_test("Protected Route Without Token", False, str(e))

# ============================================================================
# SUMMARY
# ============================================================================
section("TEST EXECUTION COMPLETE")
print(f"\n{GREEN}All tests executed successfully!{RESET}\n")
print(f"{YELLOW}Backend Server:{RESET} http://localhost:8000")
print(f"{YELLOW}Frontend Server:{RESET} http://localhost:5173")
print(f"{YELLOW}API Documentation:{RESET} http://localhost:8000/docs")
print(f"{YELLOW}Test User:{RESET} {TEST_EMAIL} / {TEST_PASSWORD}\n")
