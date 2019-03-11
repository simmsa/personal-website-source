import matplotlib
import matplotlib.pyplot as plt

matplotlib.use("Agg")

plt.plot([1, 2, 3, 4])

plt.savefig("first_plot.png")
