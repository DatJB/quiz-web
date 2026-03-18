package com.group.backend.entity;

import com.group.backend.constant.entity.QuestionOptionEntityConstant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = QuestionOptionEntityConstant.TABLE_NAME)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionOptionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = QuestionOptionEntityConstant.COL_ID)
  private Integer id;

  @Column(name = QuestionOptionEntityConstant.COL_QUESTION_ID, nullable = false)
  private Integer questionId;

  @Column(name = QuestionOptionEntityConstant.COL_CONTENT, columnDefinition = "TEXT", nullable = false)
  private String content;

  @Column(name = QuestionOptionEntityConstant.COL_IS_CORRECT, nullable = false)
  private Boolean isCorrect;
}