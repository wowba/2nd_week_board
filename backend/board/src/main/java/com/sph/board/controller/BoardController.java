package com.sph.board.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sph.board.dto.BoardRequestDto;
import com.sph.board.dto.BoardResponseDto;
import com.sph.board.message.RestResponseMessage;
import com.sph.board.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;

	@PostMapping("/api/board")
	public ResponseEntity<RestResponseMessage> createBoard(@Valid @RequestBody BoardRequestDto boardRequestDto) {
		boardService.createBoard(boardRequestDto);
		return new ResponseEntity<>(new RestResponseMessage<>(true, "게시판 생성하기", null), HttpStatus.OK);
	}

	@GetMapping("/api/board")
	public ResponseEntity<RestResponseMessage> getAllBoard(@RequestParam int page) {
		PageRequest pageRequest = PageRequest.of(page - 1, 15, Sort.by(Sort.Direction.DESC));
		List<BoardResponseDto> boardResponseDtoList = boardService.getAllBoard(pageRequest);
		return new ResponseEntity<>(new RestResponseMessage<>(true, "게시판 리스트 가져오기",boardResponseDtoList), HttpStatus.OK);
	}

	@GetMapping("/api/board/{id}")
	public ResponseEntity<RestResponseMessage> getBoard(@PathVariable long id) {
		BoardResponseDto boardResponseDto = boardService.getBoard(id);
		return new ResponseEntity<>(new RestResponseMessage<>(true, "게시판 상세내용 가져오기", boardResponseDto), HttpStatus.OK);
	}

	@PatchMapping("/api/board/{id}")
	public ResponseEntity<RestResponseMessage> editBoard(@PathVariable long id,
		@Valid @RequestBody BoardRequestDto boardRequestDto) {
		boardService.editBoard(boardRequestDto, id);
		return new ResponseEntity<>(new RestResponseMessage(true, "게시판 수정하기", null), HttpStatus.OK);
	}

	@DeleteMapping("/api/board")
	public ResponseEntity<RestResponseMessage> deleteBoard(@RequestBody Map<String, String> param) {
		boardService.deleteBoard(param);
		return new ResponseEntity<>(new RestResponseMessage(true, "게시판 삭제하기", null), HttpStatus.OK);
	}
}