package com.group.backend.exception.business;

import com.group.backend.constant.exception.ExceptionConstant;
import com.group.backend.exception.base.BusinessException;
import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends BusinessException {

  public static final String ERROR_CODE = "RESOURCE_NOT_FOUND";

  public ResourceNotFoundException() {
    super(ERROR_CODE, HttpStatus.NOT_FOUND, ExceptionConstant.TITLE_NOT_FOUND);
  }
}
