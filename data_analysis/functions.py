##
# Data manipulation imports
##
import csv
import time
import numpy
import copy
import json
import numpy
import math
###
# Machine Learning imports
##

from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from fastprogress import master_bar, progress_bar
from sklearn.metrics import precision_score

##
# Data viz libraries
##

import seaborn as sns
import matplotlib.pyplot as plt

def get_data(file, filter_macs=False, allowed_macs=[], to_zero=False, non_zero_macs=[]):
    naming = {'from': {}, 'to': {}}
    rows = []
    rows_aux = []
    naming_num = 0
    header = []
    row_length = len(allowed_macs) + 1
    target_names_max = []
    with open(file, 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')

        for i, row in enumerate(reader):
            new_row = numpy.zeros(row_length)
            used_index = 0
            if i == 0:
                header = row
                index_acum = 1
                index_acum_2 = 1
                new_indexes = {}
                zero_index = {}
                for j, val in enumerate(row):
                    if j == 0:
                        continue
                    if header[j].split('wifi-')[1] in allowed_macs:
                        new_indexes[j] = index_acum
                        index_acum += 1
                    else:
                        new_indexes[j] = None
                    if header[j].split('wifi-')[1] in non_zero_macs:
                        zero_index[j] = index_acum
                        index_acum_2 += 1
                    else:
                        zero_index[j] = None

            else:
                for j, val in enumerate(row):
                    if j == 0:
                        # this is a name of the location
                        lab = int(val.split('_')[1])
                        if val not in naming['from']:
                            naming['from'][val] = lab
                            naming['to'][naming_num] = val
                            target_names_max.append(val)
                        new_row[0] = naming['from'][val]
                        row[0] = naming['from'][val]
                        continue
                    index_to_use = new_indexes[j]
                    idx = zero_index[j]
                    if index_to_use is None and filter_macs:
                        continue
                    if val == '':
                        new_row[index_to_use] = 0
                        row[j] = 0
                        continue
                    try:
                        if idx is None and to_zero:
                            row[j] = 0
                        else:
                            float_value = float(val)
                            new_row[index_to_use] = float_value
                            row[j] = float_value
                    except:
                        print("problem parsing value " + str(val))
                if filter_macs:
                    rows.append(new_row)
                else:
                    rows.append(row)
    y = numpy.zeros(len(rows))
    X = numpy.zeros((len(rows), len(rows[0])-1))

    record_range = list(range(len(rows)))
    for i in record_range:
        y[i] = int(rows[i][0])
        X[i, :] = numpy.array(rows[i][1:])
    return X, y-1


#####
# Funcion Auxiliar para poder hacer un print lindo de los reportes de clasificacion
#
###

def show_values(pc, fmt="%.2f", **kw):
    '''
    Heatmap with text in each cell with matplotlib's pyplot
    Source: https://stackoverflow.com/a/25074150/395857 
    By HYRY
    '''
    pc.update_scalarmappable()
    ax = pc.axes
    for p, color, value in zip(pc.get_paths(), pc.get_facecolors(), pc.get_array()):
        x, y = p.vertices[:-2, :].mean(0)
        if numpy.all(color[:3] > 0.5):
            color = (0.0, 0.0, 0.0)
        else:
            color = (1.0, 1.0, 1.0)
        ax.text(x, y, fmt % value, ha="center", va="center", color=color, **kw)


def cm2inch(*tupl):
    '''
    Specify figure size in centimeter in matplotlib
    Source: https://stackoverflow.com/a/22787457/395857
    By gns-ank
    '''
    inch = 2.54
    if type(tupl[0]) == tuple:
        return tuple(i/inch for i in tupl[0])
    else:
        return tuple(i/inch for i in tupl)


def heatmap(AUC, title, xlabel, ylabel, xticklabels, yticklabels, figure_width=40, figure_height=20, correct_orientation=False, cmap='RdBu'):
    '''
    Inspired by:
    - https://stackoverflow.com/a/16124677/395857 
    - https://stackoverflow.com/a/25074150/395857
    '''

    # Plot it out
    fig, ax = plt.subplots()    
    #c = ax.pcolor(AUC, edgecolors='k', linestyle= 'dashed', linewidths=0.2, cmap='RdBu', vmin=0.0, vmax=1.0)
    c = ax.pcolor(AUC, edgecolors='k', linestyle= 'dashed', linewidths=0.2, cmap=cmap)

    # put the major ticks at the middle of each cell
    ax.set_yticks(numpy.arange(AUC.shape[0]) + 0.5, minor=False)
    ax.set_xticks(numpy.arange(AUC.shape[1]) + 0.5, minor=False)

    # set tick labels
    #ax.set_xticklabels(np.arange(1,AUC.shape[1]+1), minor=False)
    ax.set_xticklabels(xticklabels, minor=False)
    ax.set_yticklabels(yticklabels, minor=False)

    # set title and x/y labels
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)      

    # Remove last blank column
    plt.xlim( (0, AUC.shape[1]) )

    # Turn off all the ticks
    ax = plt.gca()    
    for t in ax.xaxis.get_major_ticks():
        t.tick1On = False
        t.tick2On = False
    for t in ax.yaxis.get_major_ticks():
        t.tick1On = False
        t.tick2On = False

    # Add color bar
    plt.colorbar(c)
    plt.rcParams.update({'font.size': 14})


    # Add text in each cell 
    show_values(c)

    # Proper orientation (origin at the top left instead of bottom left)
    if correct_orientation:
        ax.invert_yaxis()
        ax.xaxis.tick_top()       

    # resize 
    fig = plt.gcf()
    fig.set_size_inches(cm2inch(figure_width, figure_height))
    fig.savefig(f'{title}.svg', format="svg")



def plot_classification_report(classification_report, title, cmap='RdBu'):
    '''
    Plot scikit-learn classification report.
    Extension based on https://stackoverflow.com/a/31689645/395857 
    '''
    lines = classification_report.split('\n')

    classes = []
    plotMat = []
    support = []
    class_names = []
    for line in lines[2 : (len(lines) - 4)]:
        t = line.strip().split()
        if len(t) < 2: continue
        classes.append(t[0])
        v = []
        for x in t[1: len(t) - 2]:
            if t[1] != 'avg':
                v.append(float(x))
        support.append(int(t[-1]))
        class_names.append(t[0])
        plotMat.append(v)

    xlabel = 'Métricas'
    ylabel = 'Zonas'
    xticklabels = ['Precisión', 'Exhaustividad']
    yticklabels = ['{0} ({1})'.format(class_names[idx], sup) for idx, sup  in enumerate(support)]
    figure_width = 25
    figure_height = len(class_names) + 7
    correct_orientation = False
    heatmap(numpy.array(plotMat), title, xlabel, ylabel, xticklabels, yticklabels, figure_width, figure_height, correct_orientation, cmap=cmap)

## Funcion Auxiliar
def youden_statistic(y_actual, y_hat):
    TP = 0
    FP = 0
    TN = 0
    FN = 0
    for i in range(len(y_hat)): 
        if y_actual[i]==y_hat[i]==1:
           TP += 1
        if y_hat[i]==1 and y_actual[i]!=y_hat[i]:
           FP += 1
        if y_actual[i]==y_hat[i]==0:
           TN += 1
        if y_hat[i]==0 and y_actual[i]!=y_hat[i]:
           FN += 1
    sensitivity = 0
    if TP + FN != 0:
        sensitivity = TP / (TP + FN)
    specificity = 0
    if TN + FP != 0:
        specificity = TN / (TN + FP)
    return specificity + sensitivity - 1



def split_train_test_val(X,y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)

    X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2,  random_state=1)
    
    return X_train, X_test, X_val, y_train, y_test, y_val

def train_algorithms(X_train, y_train, X_test, y_test, names, classifiers):
    algorithms = {}

    for name, clf in zip(names, classifiers):
        try:
            algorithms[name] =  clf.fit(X_train,y_train)
        except Exception as e:
            print(str(e))

    results = {}

    for alg in algorithms.keys():
        results[alg] = algorithms[alg].predict(X_test)

    youden = {}

    for key in results.keys():
        youden[key] = youden_statistic(y_test,results[key])
    
    return algorithms, youden

def classify(algorithms, youden, X_val):
    probabilities = {}

    for alg in algorithms.keys():
        probabilities[alg] = algorithms[alg].predict_proba(X_val)


    shape = numpy.shape(probabilities['Nearest Neighbors'])

    probs = numpy.zeros(shape)

    for key in algorithms.keys():
        probs = probs + numpy.matrix(probabilities[key])*youden[key]

    y_final = numpy.argmax(probs, axis=1)

    y_final = numpy.asarray(y_final).reshape(-1)
    
    return y_final


def save_cm(y_val, y_final, matrix_img_name, target_names):
    cm = confusion_matrix(y_val, y_final)
    fig, ax = plt.subplots(figsize=(15,15))         # Sample figsize
    heat_map = sns.heatmap(cm, annot=True, annot_kws={"size": 12}, fmt="d", linewidths=.2,ax=ax,xticklabels=target_names, yticklabels=target_names)
    fig = heat_map.get_figure()
    plt.rcParams.update({'font.size': 18})
    fig.savefig(f'{matrix_img_name}.svg', format="svg")

def report_classify(y_val, y_final, matrix_img_name, target_names):
    prec = precision_score(y_val, y_final, average='macro')
    class_rep = classification_report(y_val, y_final, target_names=target_names)
    plot_classification_report(class_rep, matrix_img_name + '_class')
    return prec


def subsample(X, y, percentage):
    X_subsample = numpy.zeros((0, 188))
    y_subsample = []
    unique, counts = numpy.unique(y, return_counts=True)
    count_dict = dict(zip(unique, counts))

    for i in range(0,16):
        count = math.floor(count_dict[i]* percentage)
        X_=X[y==i]
        y_=y[y==i]
        X_subsample = numpy.vstack([X_subsample,X_[:count]])
        y_subsample = numpy.concatenate((y_subsample,y_[:count]), axis=None)
    return X_subsample, y_subsample