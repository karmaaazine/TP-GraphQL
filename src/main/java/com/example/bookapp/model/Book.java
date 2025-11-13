package com.example.bookapp.model;

public class Book {
    private String id;
    private String title;
    private String author;
    private Double price;
    private String isbn;
    private Category category;

    public Book() {}

    public Book(String id, String title, String author, Double price,
    String isbn, Category category) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
        this.isbn = isbn;
        this.category = category; 
    }

    // Getters et Setters
    public String getId() { 
        return id; }
        
    public void setId(String id) { 
        this.id = id; }

    public String getTitle() { 
        return title; }

    public void setTitle(String title) { 
        this.title = title; }

    public String getAuthor() { 
        return author; }

    public void setAuthor(String author) { 
        this.author = author; }

    public Double getPrice() { 
        return price; }

    public void setPrice(Double price) { 
        this.price = price; }

    public String getIsbn() { 
        return isbn; }

    public void setIsbn(String isbn) { 
        this.isbn = isbn; }

    public Category getCategory() { 
        return category; }

    public void setCategory(Category category) { 
        this.category = category;}
    }
    
    enum Category {
        FICTION, SCIENCE, TECHNOLOGY, HISTORY, BIOGRAPHY
    }