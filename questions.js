/**
 * IDERRORS - Enhanced Questions Database
 * Phrasal verbs with challenging synonymous options
 */

const GAME_EXERCISES = [
    {
        id: "loop_control_01",
        title: "Loop Control Challenge",
        code: "for(int i = 0; i < 5; i++) {\n    if(i == 3) {\n        ______;\n    }\n    System.out.println(\"Number: \" + i);\n}",
        phrasalVerb: "break out = escape from a loop",
        explanation: "When you want to exit completely from a loop, you 'break out' of it.",
        error: "The loop won't terminate properly without the correct flow control statement.",
        // Challenging options - all are valid programming terms
        options: ["terminate", "break", "exit"],
        correct: 1,
        executeResult: "Number: 0|Number: 1|Number: 2|[Loop terminated - broke out successfully]",
        difficulty: "beginner"
    },
    {
        id: "database_setup_01", 
        title: "Database Configuration",
        code: "public void initializeDatabase() {\n    connectionPool.______(dbConfig);\n    System.out.println(\"Database ready!\");\n}",
        phrasalVerb: "set up = initialize/configure",
        explanation: "Before using a database, you need to 'set up' the connection pool with proper configuration.",
        error: "Cannot establish database connection without proper initialization method.",
        // All options are realistic method names
        options: ["configure", "initialize", "establish"],
        correct: 1, // initialize is closest to "set up" 
        executeResult: "Connection pool initializing...|Configuration loaded successfully|Database ready!|[Database set up complete]",
        difficulty: "intermediate"
    },
    {
        id: "exception_handling_01",
        title: "Exception Management", 
        code: "try {\n    result = processData();\n} catch(RuntimeException ex) {\n    logger.error(\"Issues ______ during processing\", ex);\n    handleFailure(ex);\n}",
        phrasalVerb: "come up = appear/arise unexpectedly",
        explanation: "When problems 'come up' during execution, we log and handle them appropriately.",
        error: "Exception logging incomplete - missing description of how problems manifest.",
        // All are synonyms for "arise/appear" 
        options: ["occurred", "arose", "emerged"], 
        correct: 1, // "arose" is closest to "came up"
        executeResult: "Processing started...|Runtime exception detected|Issues arose during processing|Error handled gracefully|System continues",
        difficulty: "intermediate"
    },
    {
        id: "conditional_processing_01",
        title: "Conditional Array Processing",
        code: "int[] data = {1,2,3,4,5,6};\nfor(int value : data) {\n    if(value % 2 == 0) {\n        continue; // ______ even numbers\n    }\n    processOddNumber(value);\n}",
        phrasalVerb: "skip over = bypass without processing", 
        explanation: "In conditional logic, we 'skip over' elements that don't meet our criteria.",
        error: "Comment doesn't accurately describe the continue statement's behavior.",
        // All mean "to bypass" but with different connotations
        options: ["bypass", "ignore", "omit"],
        correct: 0, // "bypass" is most accurate for "skip over"
        executeResult: "Processing array: [1,2,3,4,5,6]|Bypassing: 2|Processing: 1|Bypassing: 4|Processing: 3|Bypassing: 6|Processing: 5|Result: [1,3,5]",
        difficulty: "beginner"
    },
    {
        id: "object_initialization_01",
        title: "Service Initialization",
        code: "public class GameService {\n    public void startGameSession() {\n        playerRegistry = new HashMap<>();\n        // ______ player tracking system\n        playerRegistry.put(\"default\", new Player());\n    }\n}",
        phrasalVerb: "set up = establish/create",
        explanation: "When starting a service, you 'set up' the necessary data structures and components.",
        error: "Comment needs to describe the action of establishing the tracking system.",
        // All are valid actions for system initialization
        options: ["establish", "create", "configure"],
        correct: 0, // "establish" best matches "set up" in this context
        executeResult: "Game service starting...|Establishing player registry|Default player created|Player tracking system ready|Service initialized successfully",
        difficulty: "intermediate"
    },
    {
        id: "memory_cleanup_01",
        title: "Resource Management",
        code: "public void cleanupResources() {\n    if(tempFiles != null) {\n        // ______ temporary files\n        tempFiles.clear();\n        tempFiles = null;\n    }\n}",
        phrasalVerb: "clear out = remove completely",
        explanation: "During cleanup, you 'clear out' temporary resources to free memory.",
        error: "Comment should describe the complete removal action.",
        options: ["remove", "delete", "purge"],
        correct: 2, // "purge" implies complete removal like "clear out"
        executeResult: "Cleanup initiated|Checking temporary files|Purging file references|Memory freed|Cleanup complete",
        difficulty: "advanced"
    },
    {
        id: "api_integration_01", 
        title: "External API Integration",
        code: "public void connectToAPI() {\n    try {\n        apiClient.authenticate(credentials);\n        // Connection ______ successfully \n        startDataSync();\n    } catch(AuthException e) {\n        handleAuthFailure(e);\n    }\n}",
        phrasalVerb: "come through = succeed/work properly",
        explanation: "When an API connection 'comes through', it means the authentication succeeded.",
        error: "Comment needs to describe successful connection establishment.",
        options: ["established", "succeeded", "completed"],
        correct: 1, // "succeeded" best captures "came through"
        executeResult: "Authenticating with API|Credentials validated|Connection succeeded|Data sync started|Integration complete",
        difficulty: "advanced"
    },
    {
        id: "data_validation_01",
        title: "Input Validation",
        code: "public boolean validateInput(String data) {\n    if(data == null || data.trim().isEmpty()) {\n        // ______ invalid input\n        return false;\n    }\n    return processValidData(data);\n}",
        phrasalVerb: "rule out = reject/exclude",
        explanation: "In validation, you 'rule out' data that doesn't meet the requirements.",
        error: "Comment should describe the rejection of invalid data.",
        options: ["reject", "exclude", "dismiss"],
        correct: 0, // "reject" is most direct translation of "rule out"
        executeResult: "Validating input data|Null check: passed|Empty check: passed|Rejecting invalid format|Validation failed",
        difficulty: "beginner"
    }
];

/**
 * Get exercise by ID
 */
function getExerciseById(id) {
    return GAME_EXERCISES.find(exercise => exercise.id === id);
}

/**
 * Get exercises by difficulty
 */
function getExercisesByDifficulty(difficulty) {
    return GAME_EXERCISES.filter(exercise => exercise.difficulty === difficulty);
}

/**
 * Get random exercise set for game
 */
function getRandomExerciseSet(count = 5) {
    const shuffled = [...GAME_EXERCISES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, GAME_EXERCISES.length));
}

/**
 * Get exercise by index for sequential gameplay
 */
function getExerciseByIndex(index) {
    if (index >= 0 && index < GAME_EXERCISES.length) {
        return GAME_EXERCISES[index];
    }
    return null;
}

/**
 * Validate answer for an exercise
 */
function validateExerciseAnswer(exerciseId, answerIndex) {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return null;
    
    return {
        correct: answerIndex === exercise.correct,
        correctAnswer: exercise.options[exercise.correct],
        explanation: exercise.explanation,
        phrasalVerb: exercise.phrasalVerb
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GAME_EXERCISES,
        getExerciseById,
        getExercisesByDifficulty, 
        getRandomExerciseSet,
        getExerciseByIndex,
        validateExerciseAnswer
    };
}