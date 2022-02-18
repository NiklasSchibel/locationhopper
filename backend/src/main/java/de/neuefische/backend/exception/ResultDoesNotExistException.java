package de.neuefische.backend.exception;

import java.util.NoSuchElementException;

public class ResultDoesNotExistException extends NoSuchElementException{

    public ResultDoesNotExistException(String s) {
        super(s);
    }

    public ResultDoesNotExistException() {
        super();
    }
}