package de.neuefische.backend.exception;

import java.util.NoSuchElementException;

public class AnimalDoesNotExistException extends NoSuchElementException {

    public AnimalDoesNotExistException(String s) {
        super(s);
    }

    public AnimalDoesNotExistException() {
        super();
    }
}
