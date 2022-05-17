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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"게시판 관련 컨트롤러"})
@RestController
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;

	@ApiOperation(value = "게시판 생성하기")
	@PostMapping("/api/board")
	public ResponseEntity<RestResponseMessage> createBoard(@Valid @RequestBody BoardRequestDto boardRequestDto) {
		boardService.createBoard(boardRequestDto);
		return new ResponseEntity<>(new RestResponseMessage<>(true, "게시판 생성하기", null), HttpStatus.OK);
	}

	@ApiOperation(value = "게시판 리스트 가져오기")
	@ApiImplicitParam(name = "page", value = "페이지 값", required = true, dataType = "int")
	@GetMapping("/api/board")
	public ResponseEntity<RestResponseMessage> getAllBoard(@RequestParam int page) {
		PageRequest pageRequest = PageRequest.of(page - 1, 15, Sort.by(Sort.Direction.DESC, "createdAt"));
		Map<String, Object> data = boardService.getAllBoard(pageRequest);
		return new ResponseEntity<>(new RestResponseMessage<>(true, "게시판 리스트 가져오기", data), HttpStatus.OK);
	}

	@ApiOperation(value = "게시판 상세내용 가져오기")
	@ApiImplicitParam(name = "id", value = "게시판 id", required = true, dataType = "int")
	@GetMapping("/api/board/{id}")
	public ResponseEntity<RestResponseMessage> getBoard(@PathVariable long id) {
		BoardResponseDto boardResponseDto = boardService.getBoard(id);
		return new ResponseEntity<>(new RestResponseMessage<>(true, "게시판 상세내용 가져오기", boardResponseDto), HttpStatus.OK);
	}

	@ApiOperation(value = "게시판 수정하기")
	@ApiImplicitParam(name = "id", value = "게시판 id", required = true, dataType = "int")
	@PatchMapping("/api/board/{id}")
	public ResponseEntity<RestResponseMessage> editBoard(@PathVariable long id,
		@Valid @RequestBody BoardRequestDto boardRequestDto) {
		boardService.editBoard(boardRequestDto, id);
		return new ResponseEntity<>(new RestResponseMessage(true, "게시판 수정하기", null), HttpStatus.OK);
	}

	@ApiOperation(value = "게시판 삭제하기")
	@DeleteMapping("/api/board")
	public ResponseEntity<RestResponseMessage> deleteBoard(@RequestBody Map<String, String> param) {
		boardService.deleteBoard(param);
		return new ResponseEntity<>(new RestResponseMessage(true, "게시판 삭제하기", null), HttpStatus.OK);
	}

	@ApiOperation(value = "더미 게시판 생성하기")
	@PostMapping("/api/dummy")
	public ResponseEntity<RestResponseMessage> createDummy() throws InterruptedException {
		boardService.createDummy();
		return new ResponseEntity<>(new RestResponseMessage(true, "더미데이터 생성", null), HttpStatus.OK);
	}
}