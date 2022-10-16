package com.project.questapp.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.questapp.entities.Comment;
import com.project.questapp.entities.Like;

public interface LikeRepository extends JpaRepository<Like,Long> {

	List<Like> finByUserIdAndPostId(Long long1, Long long2);

	List<Like> findByUserId(Long long1);

	List<Like> findByPostId(Long long1);

	Like save(Comment commentToSave);

}
