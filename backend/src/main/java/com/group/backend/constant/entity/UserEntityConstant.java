package com.group.backend.constant.entity;

public class UserEntityConstant {

  private UserEntityConstant() {
  }

  public static final String TABLE_NAME = "users";
  public static final String COL_ID = "id";
  public static final String COL_USERNAME = "username";
  public static final String COL_EMAIL = "email";
  public static final String COL_PASSWORD = "password";
  public static final String COL_ROLE = "role";

  public static final int USERNAME_MAX_LENGTH = 50;
  public static final int EMAIL_MAX_LENGTH = 100;
}
