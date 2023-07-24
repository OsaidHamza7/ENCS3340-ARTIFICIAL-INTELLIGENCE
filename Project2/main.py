import numpy as np
import csv
import sys
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier


# Constants for test set size and number of neighbors
TEST_SIZE = 0.3
K = 3

# K-Nearest Neighbor (KNN) classifier class
class NN:
    # Initialize with training features and labels
    def __init__(self, trainingFeatures, trainingLabels) -> None:
        self.trainingFeatures = trainingFeatures
        self.trainingLabels = trainingLabels

    # Predict the label for a given set of features using KNN algorithm
    def predict(self, features, k):
        predicted_labels = []
        for test_point in features:
            distances = []
            for train_point in self.trainingFeatures:
                # Calculate the Euclidean distance from each training point to the test point
                distances.append(np.linalg.norm(np.array(test_point) - np.array(train_point)))
            # Get the indices of the 'k' training points with the smallest distances to the test point
            indices = np.argsort(distances)[:k]
            # Predict the label of the test point by majority vote
            labels = [self.trainingLabels[i] for i in indices]
            predicted_labels.append(max(set(labels), key=labels.count))
        return predicted_labels

# Function to load data from CSV file
def load_data(filename):
    with open(filename, newline='') as csvfile:
        data = list(csv.reader(csvfile))
        # Labels are the last column of data
        labels = [row[-1] for row in data]
        # Features are all but the last column
        features = [row[:-1] for row in data]
        return np.array(features, dtype=float), np.array(labels, dtype=float)

# Function to normalize the features
def preprocess(features):
    # Subtract the mean and divide by the standard deviation
    features -= np.mean(features, axis=0)
    features /= np.std(features, axis=0)
    return features

# Function to train the Multi-Layer Perceptron (MLP) model
def train_mlp_model(features, labels):
    # Initialize MLPClassifier and fit it to the data
    mlp = MLPClassifier(hidden_layer_sizes=(10,5), activation='logistic', max_iter=2000)
    mlp.fit(features, labels)
    return mlp

# Function to evaluate model performance
def evaluate(labels, predictions):
    # Calculate True Positive, True Negative, False Positive and False Negative
    tp = sum((np.array(labels) == 1) & (np.array(predictions) == 1))
    tn = sum((np.array(labels) == 0) & (np.array(predictions) == 0))
    fp = sum((np.array(labels) == 0) & (np.array(predictions) == 1))
    fn = sum((np.array(labels) == 1) & (np.array(predictions) == 0))

    # Calculate accuracy, precision, recall, and F1 score, handling the case where the denominator could be 0
    accuracy = (tp + tn) / (tp + tn + fp + fn) if (tp + tn + fp + fn) else 0
    precision = tp / (tp + fp) if (tp + fp) else 0
    recall = tp / (tp + fn) if (tp + fn) else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) else 0

    return accuracy, precision, recall, f1, tp, tn, fp, fn


# Main function to run the script
def main():
    # Load the data, preprocess the features, and split into training and testing sets
    features, labels = load_data("spambase.csv")
    features = preprocess(features)
    X_train, X_test, y_train, y_test = train_test_split(
        features, labels, test_size=TEST_SIZE)

    # Train the KNN model and make predictions
    model_nn = NN(X_train.tolist(), y_train.tolist())
    predictions = model_nn.predict(X_test.tolist(), K)
    # Evaluate KNN model
    accuracy, precision, recall, f1, tp, tn, fp, fn = evaluate(y_test, predictions)

    print("**** 1-Nearest Neighbor Results ****")
    print("Accuracy: ", accuracy)
    print("Precision: ", precision)
    print("Recall: ", recall)
    print("F1: ", f1)

    # Train the MLP model and make predictions
    model = train_mlp_model(X_train, y_train)
    predictions = model.predict(X_test)
    # Evaluate MLP model
    accuracy, precision, recall, f1, tp, tn, fp, fn = evaluate(y_test, predictions)
    # Confusion Matrix For KNN
    print(np.array([[tn, fp], [fn, tp]]))

    print("**** MLP Results ****")
    print("Accuracy: ", accuracy)
    print("Precision: ", precision)
    print("Recall: ", recall)
    print("F1: ", f1)
    # Confusion Matrix For MLP
    print(np.array([[tn, fp], [fn, tp]]))


if __name__ == "__main__":
    main()
