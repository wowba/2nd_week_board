package com.sph.board.model;

import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import com.sph.board.dto.BoardRequestDto;
import com.sph.board.dto.BoardResponseDto;
import com.sph.board.utils.TimeStamp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board")
@DynamicUpdate
public class Board extends TimeStamp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "board_id")
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "writer")
	private String writer;

	@Column(name = "image", length = 10000000)
	private String image;

	@Builder
	public Board (String title, String content, String writer, String image) {
		this.title = title;
		this.content = content;
		this.writer = writer;
		this.image = image;
	}

	public void editBoard(BoardRequestDto boardRequestDto) {
		this.title = boardRequestDto.getTitle();
		this.content = boardRequestDto.getContent();
		this.writer = boardRequestDto.getWriter();
		this.image = boardRequestDto.getImage();
	}

	public BoardResponseDto createBoardResponseDto() {
		return BoardResponseDto.builder()
			.boardId(this.getId())
			.title(this.getTitle())
			.content(this.getContent())
			.writer(this.getWriter())
			.createdAt(this.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
			.image(this.image)
			.build();
	}
}
