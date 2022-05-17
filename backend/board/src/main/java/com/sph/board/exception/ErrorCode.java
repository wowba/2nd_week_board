package com.sph.board.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

	BOARD_NOT_FOUND(HttpStatus.NOT_FOUND, "404_Board_1", "해당 게시글이 존재하지 않습니다."),

	;
	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String errorMessage;
}
