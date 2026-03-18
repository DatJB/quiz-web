package com.group.backend.exception;

import com.group.backend.constant.exception.ExceptionConstant;
import com.group.backend.dto.ResponseGeneral;
import com.group.backend.exception.base.BaseException;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<ResponseGeneral<Object>> handleBaseException(BaseException ex) {
    logger.warn("Application Exception - Code: {}", ex.getErrorCode(), ex);

    String detailMessage = ex.getMessage();

    ResponseGeneral<Object> response = ResponseGeneral.of(
        ex.getHttpStatus().value(),
        detailMessage,
        null,
        LocalDateTime.now().toString()
    );

    return ResponseEntity.status(ex.getHttpStatus()).body(response);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseGeneral<Object>> handleException(Exception ex) {
    logger.error("System Error occurred: ", ex);

    String detailMessage = ExceptionConstant.GROUP_CODE_SYSTEM;

    ResponseGeneral<Object> response = ResponseGeneral.of(
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        detailMessage,
        null,
        LocalDateTime.now().toString()
    );

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }
}
