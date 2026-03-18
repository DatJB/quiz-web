package com.group.backend.entity;

import com.group.backend.constant.entity.StudentEntityConstant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = StudentEntityConstant.TABLE_NAME)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentEntity {

  @Id
  @Column(name = StudentEntityConstant.COL_USER_ID)
  private Integer userId;

  @Column(name = StudentEntityConstant.COL_STUDENT_CODE, unique = true, nullable = false, length = StudentEntityConstant.STUDENT_CODE_MAX_LENGTH)
  private String studentCode;

  @Column(name = StudentEntityConstant.COL_CLASS_ID)
  private Integer classId;

  @Column(name = StudentEntityConstant.COL_PHONE, length = StudentEntityConstant.PHONE_MAX_LENGTH)
  private String phone;
}