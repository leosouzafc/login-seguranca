def test_create_user(create_user):
    response = create_user("newusertest", "Password123!")
    assert response.status_code == 201
    assert response.json()["username"] == "newusertest"

def test_list_users_as_user(test_client, create_user):
    create_user("user1", "Password123!")
    response_json = test_client.post("/auth/login", json={
        "username":"user1", "password":"Password123!"
    })
    token = response_json.json()['token']
    create_user("user2", "Password123!") 
    response = test_client.get("/users/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 403

def test_list_users_as_admin(test_client, create_user, admin_token):
    create_user("user1", "Password123!")
    create_user("user2", "Password123!") 
    response = test_client.get(
        f"/users/",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert response.status_code == 200
    
def test_get_user(test_client, create_user):
    user = create_user("newuser", "Password123!")
    response_json = test_client.post("/auth/login", json={
        "username":"newuser", "password":"Password123!"
    })
    token = response_json.json()['token']
    response = test_client.get(
        f"/users/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["username"] == "newuser"

def test_delete_user(test_client, create_user):
    response = create_user("deletableuser", "Password123!")
    user_id = response.json()["id"]
    response = test_client.delete(f"/users/{user_id}")
    assert response.status_code == 401
