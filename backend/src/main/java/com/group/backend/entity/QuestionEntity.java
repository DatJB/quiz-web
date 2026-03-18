package com.group.backend.entity;

import com.group.backend.constant.entity.QuestionEntityConstant;
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
@Table(name = QuestionEntityConstant.TABLE_NAME)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = QuestionEntityConstant.COL_ID)
  private Integer id;

  @Column(name = QuestionEntityConstant.COL_EXAM_ID, nullable = false)
  private Integer examId;

  @Column(name = QuestionEntityConstant.COL_CONTENT, columnDefinition = "TEXT", nullable = false)
  private String content;

  @Column(name = QuestionEntityConstant.COL_EXPLANATION, columnDefinition = "TEXT")
  private String explanation;
}