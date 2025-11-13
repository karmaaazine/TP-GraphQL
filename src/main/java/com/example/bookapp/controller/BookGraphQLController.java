package com.example.bookapp.controller;

import com.example.bookapp.model.Book;
import com.example.bookapp.model.Book.Category;
import com.example.bookapp.service.BookService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class BookGraphQLController {

    private final BookService bookService;

    public BookGraphQLController(BookService bookService) {
        this.bookService = bookService;
    }

    @QueryMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @QueryMapping
    public Book getBookById(@Argument String id) {
        return bookService.getBookById(id);
    }

    @QueryMapping
    public List<Book> getBooksByCategory(@Argument Category category) {
        return bookService.getBooksByCategory(category);
    }

    @QueryMapping
    public List<Book> searchBooks(@Argument String title) {
        return bookService.searchBooksByTitle(title);
    }

    @MutationMapping
    public Book createBook(@Argument String title,
                           @Argument String author,
                           @Argument Double price,
                           @Argument String isbn,
                           @Argument Category category) {
        return bookService.createBook(title, author, price, isbn, category);
    }

    @MutationMapping
    public Book updateBook(@Argument String id,
                           @Argument String title,
                           @Argument String author,
                           @Argument Double price,
                           @Argument String isbn,
                           @Argument Category category) {
        return bookService.updateBook(id, title, author, price, isbn, category);
    }

    @MutationMapping
    public Boolean deleteBook(@Argument String id) {
        return bookService.deleteBook(id);
    }
}
