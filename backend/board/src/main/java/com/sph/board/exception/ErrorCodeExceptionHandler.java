package com.sph.board.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ErrorCodeExceptionHandler {
	@ExceptionHandler( value = { ErrorCodeException.class })
	protected ResponseEntity<ErrorCodeResponse> handleCustomException(ErrorCodeException e) {
		log.error("Error - ErrorCodeException : " + e.getErrorCode());
		return ErrorCodeResponse.toResponseEntity(e.getErrorCode());
	}
}
