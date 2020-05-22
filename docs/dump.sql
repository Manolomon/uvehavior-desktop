CREATE TABLE experiment (
    idExperiment INTEGER PRIMARY KEY NOT NULL,
    experimentName TEXT NOT NULL,
    experimentDescription TEXT,
    creationDate DATE DEFAULT (date('now')),
    lastModifiedDate DATETIME
);

CREATE TABLE groups (
    idGroup INTEGER NOT NULL,
    idExperiment INTEGER NOT NULL,
    groupName TEXT NOT NULL,
    groupDescription TEXT,
    PRIMARY KEY (idGroup, idExperiment),
    FOREIGN KEY (idExperiment)
        REFERENCES experiment (idExperiment)
            ON DELETE CASCADE
);

CREATE TABLE subject (
    idSubject INTEGER NOT NULL,
    idGroup INTEGER NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY (idSubject, idGroup),
    FOREIGN KEY (idGroup)
        REFERENCES groups (idGroup)
            ON DELETE CASCADE
);

CREATE TABLE test (
    idTest INTEGER NOT NULL,
    idExperiment INTEGER NOT NULL,
    testName TEXT NOT NULL,
    testDescription TEXT,
    testTime INTEGER NOT NULL,
    PRIMARY KEY (idTest, idExperiment),
    FOREIGN KEY (idExperiment)
        REFERENCES experiment (idExperiment)
            ON DELETE CASCADE
);

CREATE TABLE behavior (
    idBehavior INTEGER NOT NULL,
    idTest INTEGER NOT NULL,
    name TEXT NOT NULL,
    associatedKey VARCHAR(1) NOT NULL,
    PRIMARY KEY (idBehavior, idTest),
    FOREIGN KEY (idTest)
        REFERENCES test (idTest)
            ON DELETE CASCADE
);

CREATE TABLE evaluation (
    idEvaluation INTEGER NOT NULL,
    idSubject INTEGER NOT NULL,
    videoPath TEXT NOT NULL,
    evaluationDate DATE NOT NULL DEFAULT (date('now')),
    PRIMARY KEY (idEvaluation, idSubject),
    FOREIGN KEY (idSubject)
        REFERENCES subject (idSubject)
            ON DELETE CASCADE
);

CREATE TABLE behavior_evaluation (
    idEvaluation INTEGER NOT NULL,
    idBehavior INTEGER NOT NULL,
    idBehaviorEvaluation INTEGER NOT NULL,
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
    idAnnotation INTEGER NOT NULL,
    idBehaviorEvaluation INTEGER NOT NULL,
    timeLog REAL NOT NULL,
    PRIMARY KEY (idAnnotation, idBehaviorEvaluation),
    FOREIGN KEY (idBehaviorEvaluation)
        REFERENCES behavior_evaluationv (idBehaviorEvaluation)
);