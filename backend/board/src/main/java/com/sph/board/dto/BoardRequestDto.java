package com.sph.board.dto;

import javax.validation.constraints.NotNull;

import com.sph.board.model.Board;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardRequestDto {

	@NotNull(message = "게시글의 제목이 있어야 합니다.")
	private String title;

	@NotNull(message = "게시글의 내용이 있어야 합니다.")
	private String content;

	@NotNull(message = "게시글의 작성자가 있어야 합니다.")
	private String writer;

	public Board createBoard() {
		return Board.builder()
			.title(this.title)
			.writer(this.writer)
			.content(this.content)
			.build();
	}
}
