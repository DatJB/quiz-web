package com.group.backend.entity;

import com.group.backend.constant.entity.AnswerEntityConstant;
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
@Table(name = AnswerEntityConstant.TABLE_NAME)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = AnswerEntityConstant.COL_ID)
  private Integer id;

  @Column(name = AnswerEntityConstant.COL_ATTEMPT_ID, nullable = false)
  private Integer attemptId;

  @Column(name = AnswerEntityConstant.COL_QUESTION_ID, nullable = false)
  private Integer questionId;

  @Column(name = AnswerEntityConstant.COL_SELECTED_OPTION_ID)
  private Integer selectedOptionId;

  @Column(name = AnswerEntityConstant.COL_IS_CORRECT)
  private Boolean isCorrect;
}