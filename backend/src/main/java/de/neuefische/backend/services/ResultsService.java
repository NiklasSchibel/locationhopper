package de.neuefische.backend.services;

import de.neuefische.backend.controller.AnimalController;
import de.neuefische.backend.dto.ResultsDTO;
import de.neuefische.backend.exception.ResultDoesNotExistException;
import de.neuefische.backend.models.ResultsData;
import de.neuefische.backend.repositories.ResultsRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;


@Service
public class ResultsService {

    private static final Log LOG = LogFactory.getLog(ResultsService.class);
    private final ResultsRepository resultsRepository;

    public ResultsService(ResultsRepository resultsRepository) {
        this.resultsRepository = resultsRepository;
    }

    public ResultsData getResultsByName(String userName) throws ResultDoesNotExistException {
        return resultsRepository.findById(userName)
                .orElseThrow(() -> new ResultDoesNotExistException("no results found for user: " + userName));
    }

    public void sentLetterResultToDB(String letter, String userName) throws ResultDoesNotExistException {
        ResultsData result = resultsRepository.findById(userName)
                .orElseThrow(() -> new ResultDoesNotExistException("no results found for user: " + userName));
        result.getLettersCount().put(letter, result.getLettersCount().get(letter) + 1);
        resultsRepository.save(result);

        LOG.info(result.getLettersCount().get(letter) + 1);
    }




    public void sendDBEntry(String userName) throws ResultDoesNotExistException {
        ResultsData resultdata = new ResultsData(userName);
//        ResultsDTO result = new ResultsDTO(resultdata);
        resultsRepository.save(resultdata);
        LOG.info("following result object was saved to Mongo DB: ");
        LOG.info(resultdata);
    }


}