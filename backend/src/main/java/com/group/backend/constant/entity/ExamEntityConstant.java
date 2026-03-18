package com.group.backend.constant.entity;

public final class ExamEntityConstant {

  private ExamEntityConstant() {
  }

  public static final String TABLE_NAME = "exams";
  public static final String COL_ID = "id";
  public static final String COL_TITLE = "title";
  public static final String COL_DESCRIPTION = "description";
  public static final String COL_TYPE = "type";
  public static final String COL_START_TIME = "start_time";
  public static final String COL_END_TIME = "end_time";
  public static final String COL_DURATION = "duration";
  public static final String COL_CREATED_BY = "created_by";

  public static final int TITLE_MAX_LENGTH = 255;
}