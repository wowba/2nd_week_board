package com.sph.board.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sph.board.dto.BoardRequestDto;
import com.sph.board.dto.BoardResponseDto;
import com.sph.board.exception.ErrorCode;
import com.sph.board.exception.ErrorCodeException;
import com.sph.board.model.Board;
import com.sph.board.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;

	@Transactional(readOnly = true)
	public Map<String, Object> getAllBoard(Pageable pageable) {
		Map<String, Object> map = new HashMap<>();

		Page<Board> boards = boardRepository.findAll(pageable);
		List<BoardResponseDto> boardResponseDtoList = new ArrayList<>();
		for(Board board : boards) {
			BoardResponseDto boardResponseDto = board.createBoardResponseDto();
			boardResponseDtoList.add(boardResponseDto);
		}

		map.put("boardResponseDtoList", boardResponseDtoList);
		map.put("allPage", boards.getTotalPages());
		return map;
	}

	@Transactional(readOnly = true)
	public BoardResponseDto getBoard(long id) {
		Board board = boardRepository.findById(id)
			.orElseThrow(() -> new ErrorCodeException(ErrorCode.BOARD_NOT_FOUND));

		return board.createBoardResponseDto();
	}

	public void createBoard(BoardRequestDto boardRequestDto) {
		Board board = boardRequestDto.createBoard();
		boardRepository.save(board);
	}

	public void editBoard(BoardRequestDto boardRequestDto, long id) {
		Board board = boardRepository.findById(id)
			.orElseThrow(() -> new ErrorCodeException(ErrorCode.BOARD_NOT_FOUND));
		board.editBoard(boardRequestDto);
	}

	public void deleteBoard(Map<String, String> param) {
		String boardId = param.get("boardIdList");
		String[] boardIdList = boardId.split(",");
		for (String id : boardIdList) {
			boardRepository.deleteById(Long.parseLong(id));
		}
	}

	public void createDummy() throws InterruptedException {
		for(int i = 1; i < 101; i++) {
			Thread.sleep(50);
			Board board = Board.builder()
				.title("게시글 " + i)
				.content("게시글 " + i + " 의 내용")
				.writer("익명 " + i)
				.build();
			boardRepository.save(board);
		}
	}
}
