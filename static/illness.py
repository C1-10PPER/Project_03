import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
file_path = "../Raw_Data/Illnesses_Related_to_Pollution.csv"  # Update with your file path
df = pd.read_csv(file_path)

# Set the figure size
plt.figure(figsize=(12, 6))

# Create a box plot
sns.boxplot(
    data=df,
    x="Age group",
    y="Mean value",
    hue="GHE Cause",
    showfliers=False  # Hide outliers for better visualization
)

# Rotate x-axis labels for better readability
plt.xticks(rotation=45, ha="right")

# Add labels and title
plt.xlabel("Age Group")
plt.ylabel("Mean Value of Illness Cases")
plt.title("Distribution of Pollution-Related Illnesses by Age Group and GHE Cause")

# Move legend outside the plot
plt.legend(title="GHE Cause", bbox_to_anchor=(1.05, 1), loc='upper left')

# Show the plot
plt.tight_layout()
plt.show()
