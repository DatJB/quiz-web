package com.group.backend.constant.entity;

public final class StudentEntityConstant {

  private StudentEntityConstant() {
  }

  public static final String TABLE_NAME = "students";
  public static final String COL_USER_ID = "user_id";
  public static final String COL_STUDENT_CODE = "student_code";
  public static final String COL_CLASS_ID = "class_id";
  public static final String COL_PHONE = "phone";

  public static final int STUDENT_CODE_MAX_LENGTH = 20;
  public static final int PHONE_MAX_LENGTH = 15;
}