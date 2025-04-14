def test_login_success(create_user,test_client):
    create_user("testuser", "Password123!")
    response = test_client.post("/auth/login", json={
        "username": "testuser",
        "password": "Password123!"
    })
    assert response.status_code == 200
    assert "token" in response.json()

def test_login_failure(create_user,test_client):
    create_user("testuser", "Password123!")
    response = test_client.post("/auth/login", json={
        "username": "testuser",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
    assert response.json()["detail"] == "Credenciais inválidas"
