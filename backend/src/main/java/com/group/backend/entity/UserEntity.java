package com.group.backend.entity;

import com.group.backend.constant.entity.UserEntityConstant;
import com.group.backend.entity.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = UserEntityConstant.TABLE_NAME)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity extends BaseJpaAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = UserEntityConstant.COL_ID)
  private Integer id;

  @Column(name = UserEntityConstant.COL_USERNAME, unique = true, nullable = false, length = UserEntityConstant.USERNAME_MAX_LENGTH)
  private String username;

  @Column(name = UserEntityConstant.COL_EMAIL, unique = true, nullable = false, length = UserEntityConstant.EMAIL_MAX_LENGTH)
  private String email;

  @Column(name = UserEntityConstant.COL_PASSWORD, nullable = false)
  private String password;

  @Enumerated(EnumType.STRING)
  @Column(name = UserEntityConstant.COL_ROLE, nullable = false)
  private Role role;
}
