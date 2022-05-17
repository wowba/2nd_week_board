package com.sph.board.exception;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.ResponseEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorCodeResponse {
	private final String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	private final int status;
	private final String error;
	private final String errorCode;
	private final String msg;

	public static ResponseEntity<ErrorCodeResponse> toResponseEntity(ErrorCode errorCode) {

		return ResponseEntity
			.status(errorCode.getHttpStatus())
			.body(ErrorCodeResponse.builder()
				.status(errorCode.getHttpStatus().value())
				.error(errorCode.getHttpStatus().name())
				.errorCode(errorCode.getErrorCode())
				.msg(errorCode.getErrorMessage())
				.build()
			);
	}
}
