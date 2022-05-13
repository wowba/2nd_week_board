package com.sph.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sph.board.dto.BoardRequestDto;
import com.sph.board.dto.BoardResponseDto;
import com.sph.board.model.Board;
import com.sph.board.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;

	public List<BoardResponseDto> getAllBoard(Pageable pageable) {
		Page<Board> boards = boardRepository.findAll(pageable);
		List<BoardResponseDto> boardResponseDtoList = new ArrayList<>();
		for(Board board : boards) {
			BoardResponseDto boardResponseDto = board.createBoardResponseDto();
			boardResponseDtoList.add(boardResponseDto);
		}
		return  boardResponseDtoList;
	}

	public BoardResponseDto getBoard(long id) {
		Board board = boardRepository.findById(id)
			.orElseThrow(IllegalArgumentException::new);

		return BoardResponseDto.builder()
			.boardId(board.getId())
			.createdAt(board.getCreatedAt())
			.content(board.getContent())
			.title(board.getTitle())
			.writer(board.getWriter())
			.build();
	}

	public void createBoard(BoardRequestDto boardRequestDto) {
		Board board = Board.builder()
			.content(boardRequestDto.getContent())
			.writer(boardRequestDto.getWriter())
			.title(boardRequestDto.getTitle())
			.build();

		boardRepository.save(board);
	}

	public void editBoard(BoardRequestDto boardRequestDto, long id) {
		Board board = boardRepository.findById(id)
			.orElseThrow(IllegalArgumentException::new);
		board.editBoard(boardRequestDto);
	}

	public void deleteBoard(Map<String, String> param) {
		String boardId = param.get("boardIdList");
		String[] boardIdList = boardId.split(",");

		for (String id : boardIdList) {
			boardRepository.deleteById(Long.parseLong(id));
		}
	}

	public void createDummy() {
		for(int i = 0; i < 100; i++) {
			Board board = Board.builder()
				.title("게시글 " + i)
				.content("게시글 " + i + " 의 내용")
				.writer("익명 " + i)
				.build();
			boardRepository.save(board);
		}
	}
}
