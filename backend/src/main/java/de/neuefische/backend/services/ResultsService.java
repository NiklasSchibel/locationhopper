package de.neuefische.backend.services;

import de.neuefische.backend.exception.ResultDoesNotExistException;
import de.neuefische.backend.models.ResultsData;
import de.neuefische.backend.repositories.ResultsRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;




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


}