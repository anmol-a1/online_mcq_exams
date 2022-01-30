# Python3 implementation of the approach
m = 1000000007

# Function to return the GCD
# of given numbers
def gcd(a, b):

	if (a == 0):
		return b
	return gcd(b % a, a)

# Recursive function to return (x ^ n) % m
def modexp(x, n):

	if (n == 0) :
		return 1
	
	elif (n % 2 == 0) :
		return modexp((x * x) % m, n // 2)
	
	else :
		return (x * modexp((x * x) % m,
						(n - 1) / 2) % m)


# Function to return the fraction modulo mod
def getFractionModulo(a, b):

	c = gcd(a, b)

	a = a // c
	b = b // c

	# (b ^ m-2) % m
	d = modexp(b, m - 2)

	# Final answer
	ans = ((a % m) * (d % m)) % m

	return ans

# Driver code
if __name__ == "__main__":

	a = 5
	b = 2


	print ( getFractionModulo(a, b))

# This code is contributed by ita_c
