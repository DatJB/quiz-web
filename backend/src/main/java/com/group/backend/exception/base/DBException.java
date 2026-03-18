package com.group.backend.exception.base;

import com.group.backend.constant.exception.ExceptionConstant;
import org.springframework.http.HttpStatus;

public class DBException extends BaseException {

  private static final String ERROR_CODE = "DB_SYS_ERROR";

  public DBException() {
    super(ERROR_CODE, ExceptionConstant.GROUP_CODE_DATABASE, HttpStatus.INTERNAL_SERVER_ERROR,
        ExceptionConstant.TITLE_DATABASE_ERROR);
  }

  public DBException(String errorCode) {
    super(errorCode, ExceptionConstant.GROUP_CODE_DATABASE, HttpStatus.INTERNAL_SERVER_ERROR,
        ExceptionConstant.TITLE_DATABASE_ERROR);
  }

  public DBException(String errorCode, HttpStatus httpStatus, String message) {
    super(errorCode, ExceptionConstant.GROUP_CODE_DATABASE, httpStatus, message);
  }
}
