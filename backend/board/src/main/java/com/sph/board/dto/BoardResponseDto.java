package com.sph.board.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardResponseDto {
	private long boardId;
	private String title;
	private String content;
	private String writer;
	private String createdAt;
	private String image;
}
