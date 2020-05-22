CREATE TABLE experiment (
    idExperiment INTEGER PRIMARY KEY,
    experimentName TEXT NOT NULL,
    experimentDescription TEXT,
    creationDate DATE DEFAULT (date('now')),
    lastModifiedDate DATETIME
);

CREATE TABLE groups (
    idGroup INTEGER,
    idExperiment INTEGER,
    groupName TEXT NOT NULL,
    groupDescription TEXT,
    PRIMARY KEY (idGroup, idExperiment),
    FOREIGN KEY (idExperiment)
        REFERENCES experiment (idExperiment)
            ON DELETE CASCADE
);

CREATE TABLE subject (
    idSubject INTEGER,
    idGroup INTEGER,
    name TEXT NOT NULL,
    PRIMARY KEY (idSubject, idGroup),
    FOREIGN KEY (idGroup)
        REFERENCES groups (idGroup)
            ON DELETE CASCADE
);

CREATE TABLE test (
    idTest INTEGER,
    idExperiment INTEGER,
    testName TEXT NOT NULL,
    testDescription TEXT,
    testTime INTEGER NOT NULL,
    PRIMARY KEY (idTest, idExperiment),
    FOREIGN KEY (idExperiment)
        REFERENCES experiment (idExperiment)
            ON DELETE CASCADE
);

CREATE TABLE behavior (
    idBehavior INTEGER,
    idTest INTEGER,
    name TEXT NOT NULL,
    associatedKey VARCHAR(1),
    PRIMARY KEY (idBehavior, idTest),
    FOREIGN KEY (idTest)
        REFERENCES test (idTest)
            ON DELETE CASCADE
);

CREATE TABLE evaluation (
    idEvaluation INTEGER,
    idSubject INTEGER,
    videoPath TEXT NOT NULL,
    evaluationDate DATE NOT NULL DEFAULT (date('now')),
    PRIMARY KEY (idEvaluation, idSubject),
    FOREIGN KEY (idSubject)
        REFERENCES subject (idSubject)
            ON DELETE CASCADE
);

CREATE TABLE behavior_evaluation (
    idEvaluation INTEGER,
    idBehavior INTEGER,
    idBehaviorEvaluation INTEGER,
    latency REAL,
    frequency INTEGER,
    totalTime REAL,
    PRIMARY KEY (idEvaluation, idBehavior, idBehaviorEvaluation),
    FOREIGN KEY (idEvaluation)
        REFERENCES evaluation (idEvaluation),
    FOREIGN KEY (idBehavior)
        REFERENCES behavior (idBehavior)
            ON DELETE CASCADE
);

CREATE TABLE annotation (
    idAnnotation INTEGER,
    idBehaviorEvaluation INTEGER,
    timeLog REAL,
    PRIMARY KEY (idAnnotation, idBehaviorEvaluation),
    FOREIGN KEY (idBehaviorEvaluation)
        REFERENCES behavior_evaluationv (idBehaviorEvaluation)
);