package com.sph.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sph.board.model.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}
