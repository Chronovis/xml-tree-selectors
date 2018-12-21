export const generateId = (length = 7) => {
	length = length - 1

	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
	let text = chars.charAt(Math.floor(Math.random() * 26)) // Start with a letter

	// Countdown is more lightweight than for-loop
	while (length--) {
		text += chars.charAt(Math.floor(Math.random() * chars.length))
	}

	return text
}