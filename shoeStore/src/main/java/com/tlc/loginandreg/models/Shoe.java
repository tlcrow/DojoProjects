package com.tlc.loginandreg.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@Entity

public class Shoe {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Size(min=1, message="Shoe name must not be empty")
	private String name;
	
	private String sellerEmail;
	
	private String sellerFirst;
	
	private String sellerLast;
	
	private String buyerEmail;
	
	private String buyerFirst;
	
	private String buyerLast;
	
	@NotNull(message="Amount can not be empty")
	private double amount;
	
	private String action;
	
	@DateTimeFormat(iso = ISO.DATE)
	private Date createdAt;
	
	@DateTimeFormat(iso = ISO.DATE)
	private Date updatedAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	public Shoe() {
		
	}
	
	public Shoe(String name, String sellerEmail, String sellerFirst, String buyerEmail, String sellerLast, double amount, String action, String buyerFirst, String buyerLast) {
		this.name = name;
		this.sellerEmail = sellerEmail;
		this.sellerFirst = sellerFirst;
		this.sellerLast = sellerLast;
		this.amount = amount;
		this.action = action;
		this.buyerEmail = buyerEmail;
		this.buyerFirst = buyerFirst;
		this.buyerLast = buyerLast;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSellerEmail() {
		return sellerEmail;
	}

	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
	}

	public String getSellerFirst() {
		return sellerFirst;
	}

	public void setSellerFirst(String sellerFirst) {
		this.sellerFirst = sellerFirst;
	}

	public String getSellerLast() {
		return sellerLast;
	}

	public void setSellerLast(String sellerLast) {
		this.sellerLast = sellerLast;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public String getBuyerEmail() {
		return buyerEmail;
	}

	public void setBuyerEmail(String buyerEmail) {
		this.buyerEmail = buyerEmail;
	}

	public String getBuyerFirst() {
		return buyerFirst;
	}

	public void setBuyerFirst(String buyerFirst) {
		this.buyerFirst = buyerFirst;
	}

	public String getBuyerLast() {
		return buyerLast;
	}

	public void setBuyerLast(String buyerLast) {
		this.buyerLast = buyerLast;
	}

	@PrePersist
    protected void onCreate(){
    this.setCreatedAt(new Date());
    }

    @PreUpdate
    protected void onUpdate(){
    this.setUpdatedAt(new Date());
    }
    
    

}
