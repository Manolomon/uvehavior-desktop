---
title: 'UVehavior: An Annotation Desktop-Tool for Behavioral Observation'
tags:
  - Behavioral Science
  - Neuroethology
  - TypeScript
  - Angular
  - Electron
authors:
  - name: J. Manuel Pérez-Verdejo
    orcid: 0000-0002-3398-2632
    affiliation: 1
  - name: Héctor-Gabriel Acosta-Mesa
    orcid: 0000-0002-0935-7642
    affiliation: 2
  - name: Socorro Herrera-Meza
    orcid: 0000-0003-0838-470X
    affiliation: 3
  - name: Rafael Fernández-Demeneghi
    orcid: 0000-0002-7540-6537
    affiliation: 4
  - name: Isidro Vargas-Moreno
    orcid: 0000-0001-6774-9444
    affiliation: 4
  - name: Juan-Francisco Rodríguez-Landa
    orcid: 0000-0001-5837-103X
    affiliation: 5
affiliations:
  - name: School of Statistics and Informatics, Universidad Veracruzana, Xalapa, Mexico
    index: 1
  - name: Artificial Intelligence Research Center, Universidad Veracruzana, Xalapa, Mexico
    index: 2
  - name: Institute of Psychological Research, Universidad Veracruzana, Xalapa, Mexico
    index: 3
  - name: Doctoral Program in Neuroethology, Institute of Neuroethology, Universidad Veracruzana, Xalapa, Mexico
    index: 4
  - name: Institute of Neuroethology, Universidad Veracruzana, Xalapa, Mexico
    index: 5
date: 18 August 2020
bibliography: paper.bib
---

# Summary

Understanding behavior is a relevant task, detecting patterns in how living organisms interact and respond to different physical and emotional stimuli is an essential tool in several areas of the science, including ethology, psychology, nutrition, and pharmacology, among others. Particularly, the study of behavior in pharmacology is a high-dimensional topic that involves several activities, from the conceptualization and planning of the study, the identification and selection of specific behaviors to the analysis of the collected data. Currently, there are several automated software tools to analyze behavioral patterns that permit identify emotional, affective and motor changes associated with physiological, psychological, or pharmacological manipulations; however, they are expensive and limited to the analysis of particular behaviors that only the human eye can identify. In this regard, we introduce UVehavior, an open-source tool that allows researchers to manage, conduct, and compare behavioral observations in several animals and even human beings; which represent a free tool for researchers interested in the experimental analysis of behavior.

# Statement of Need

According to @Dugatkin:2020 behavior is the coordinated responses of whole living organisms to internal and/or external stimuli, considering behavior as an expression of the activity of the nervous system.
Neuroethology is an important area of neurosciences involved in the study of the neurobiological, neurochemical, and neurophysiological bases underlying behavior [@Bassler:1984]. Therefore, this science is interested in the quantification of the behavioral changes through the measure of frequency, latency and time duration of specific behavior under normal or altered states induced by drugs, experimental manipulations, or the experience of the individual.

However, before beginning a study on behavior, it is necessary to consider whether the design of the experiment is adequate to allow causal and logical explanations, orienting the investigation towards adequate data interpretation. The experimental design considers the study subject, conditions of the environment and the control of the variables studied [@Kirk:2012].

As part of the planning stage, the researcher defines and distributes the groups in which the subjects of study are going to be evaluated. Is by their belonging group that the individuals are subjected to a treatment, for further analysis of the effects on their behavior [@Kirk:2012]. UVehavior allows the researcher to keep track of their subjects, and distribute them by groups, as well as managing the tests to be conducted. In this regard, every test involves a specific amount of time, and a variety of behaviors to be analyzed.

# Behavioral Observation

In ethology, the behavior was typically categorized by trained observers taking advantage of their experience and intuition to identify relevant elements, however, Tinbergen’s definition leaves open the discussion of how behavior should be measured and represented [@Brown:2018].
While conducting the experiment, every subject is recorded during each defined test, where the occurrence of a specific behavior must be logged.

![Annotation main view. The left side of the window shows the playing video and controls, while the right side displays the evaluation's data and the behaviors' log.\label{fig:annotation}](src/assets/img/annotation.png)

Nevertheless, the analysis of behavior using video annotations is a complicated task. In this way, the simultaneous recording of diverse behaviors with makeshift tools, such as video editors, may be imprecise and time-consuming. Additionally, they introduce human error in the recording of the duration of each behavior, so the annotation of parallel observations is not possible, and they may be restrictive in the management and export of data to specific software for the analysis. Currently, there are different software tools for the automatized recording of animal behavior, however, most of them are expensive and complicated to use, because they were developed for the analysis of the behavior of different species under particular experimental conditions. In spite of that, this kind of software is capable of evaluating behavioral patterns automatically, unfortunately, this may not be as precise as a trained human eye and needs strict supervision by the researcher. So, it is necessary to have a software tool specially designed to record the behavior in an easy and practical way.

UVehavior assists in this core activity by featuring a suite where the researcher can evaluate their subjects, tests, and behaviors to observe, in one of these test recordings.
The desktop-tool, plays the test video, while the observer analyzes the behavior of the subject. Therefore, every time the subject performs a specific behavior, the researcher logs it by pressing one key previously bound to a behavior.
Besides keeping a record of the behavior logging, UVehavior displays three calculated variables: `latency`, `frequency`, and `duration`. For the ethological study, these measures are important for describing behaviors [@Inesta:2011]. \autoref{fig:annotation} shows the latency, frequency and time spent in grooming and rearing behavior displayed by a Wistar rat subjected to the locomotor activity test [@Fernandez-Demeneghi:2019].

# Analysis of the Results

An additional feature of UVehavior is the ability to display a timing-diagram-like [@Seidl:2015] chart of the behaviors exhibited by a subject during a test. This visualization shows a series of state changes throughout a test, where every behavior evaluated is listed on the vertical axis, whereas the horizontal one represents time. \autoref{fig:behavior_chart} shows an example of this chart, generated from an evaluated subject.

![Example of the Timing Diagram generated from an evaluation.\label{fig:behavior_chart}](src/assets/img/behavior_chart.png)

UVehavior comes from a preliminary version developed _ex profeso_ to conduct the tests' logging for the study by @Fernandez-Demeneghi:2019. However, further additions to the system are planned to turn UVehavior into a set of several tools for the analysis of behavioral observation data.

# References
