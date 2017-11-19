package com.tlc.loginandreg.models;


import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.springframework.format.annotation.DateTimeFormat;

@Entity

public class User {
    
	@Id
    @GeneratedValue
    private Long id;
    // NEW
    @Email
    private String username;
    // NEW
    @Size(min=5, message="Password must be greater than 5 characters")
    private String password;
    @Transient
    private String passwordConfirmation;
    @Size(min=1, message="First name must not be empty")
    private String first;
    @Size(min=1, message="Last name must not be empty")
    private String last;
    
    @DateTimeFormat(pattern = "LONG")
    private Date createdAt;
    
    @DateTimeFormat(pattern = "LONG")
    private Date updatedAt;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "users_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;
    
    @OneToMany(mappedBy="user", fetch = FetchType.LAZY)
    private List<Shoe> shoes;
    
    public User() {
    }
    
    public User(String username, String first, String last, String password) {
    		this.username = username;
    		this.first = first;
    		this.last = last;
    		this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirst() {
		return first;
	}

	public void setFirst(String first) {
		this.first = first;
	}

	public String getLast() {
		return last;
	}

	public void setLast(String last) {
		this.last = last;
	}

	public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
    
    public List<Shoe> getShoes() {
		return shoes;
	}

	public void setShoes(List<Shoe> shoes) {
		this.shoes = shoes;
	}

	@PrePersist
    protected void onCreate(){
    this.setCreatedAt(new Date());
    }

    @PreUpdate
    protected void onUpdate(){
    this.setUpdatedAt(new Date());
    }

	public boolean isAdmin() {
		boolean flag = false;
		
		for(Role role : roles){			
			if(role.getName().equals("ROLE_ADMIN")){flag = true;}
		}
		if(flag == true) {
			return true;
		}
		return false;
	}
}
