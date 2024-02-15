export const pp: String = `you are a mentor who creates engaging exercises. for example for the lab about audio processing exercises would look like this:

3) Lab Introduction
In this lab, we will be manipulating audio files to produce some neat effects. This week's distribution contains not only a template file that you should use for developing your code (lab.py) but also several audio files in the sounds directory, with names ending with .wav (you can try opening these files in an audio program to hear their contents).

Over the course of this lab, we will refresh ourselves on some important features and structures within Python, and we will also familiarize ourselves with interactions with files on disk (and create some really neat sound effects as well).


4) Representing Sound
In physics, when we talk about a sound, we are talking about waves of air pressure. When a sound is generated, a sound wave consisting of alternating areas of relatively high pressure ("compressions") and relatively low air pressure ("rarefactions") moves through the air.

When we use a microphone to capture a sound digitally, we do so by making periodic measurements of an electrical signal proportional to this air pressure. Each individual measurement (often called a "sample") corresponds to the air pressure at a single moment in time; by taking repeated measurements at a constant rate (the "sampling rate," usually measured in terms of the number of samples captured per second), these measurements together form a representation of the sound by approximating how the air pressure was changing over time.

When a speaker plays back that sound, it does so by converting these measurements back into waves of alternating air pressure (by moving a diaphragm proportionally to those captured measurements). In order to faithfully represent a sound, we need to know two things: both the sampling rate and the samples that were actually captured.

For sounds recorded in mono, each sample is a positive or negative number corresponding to the air pressure at a point in time. For sounds recorded in stereo, each sample can be thought of as consisting of two values: one for the left speaker and one for the right.


4.1) Python Representation
We will be working with files stored in the WAV format. However, you won't need to understand that format in detail, as we have provided some "helper functions" in lab.py to load the information from those files into a Pythonic format, as well as to take sounds in that Pythonic representation and save them as WAV files.

Our Pythonic representation of a mono sound (which we will use for the bulk of this lab) will consist of a dictionary with two key/value pairs:

'rate': the sampling rate (as an int), in units of samples per second
'samples': a list containing samples, where each sample is a float
For example, the following is a valid sound:

s = {
    'rate': 8000,
    'samples': [1.00, 0.91, 0.67, 0.31, -0.10, -0.50, -0.81, -0.98, -0.98, -0.81],
}

5) Manipulations
In this lab, we will examine the effects of various kinds of manipulations of audio represented in this form.


5.1) Backwards Audio
We'll implement our first manipulation via a function called backwards. This function should take a mono sound (using the representation described above, as a dictionary) as its input, and it should return a new mono sound that is the reversed version of the original (but without modifying the object representing the original sound!).

Reversing real-world sounds can create some neat effects. For example, consider the following sound (a crash cymbal):

When reversed, it sounds like this:

When we talk about reversing a sound in this way, we are really just talking about reversing the order of its samples (in both the left and right channels) but keeping the sampling rate the same.

Go ahead and implement the backwards function in your lab.py file. After doing so, your code should pass the first four test cases in test.py.

It can also be fun to play around with these things a little bit. For example, mystery.wav is a recording of Adam speaking nonsense. Let's try using our new function to produce a modified version of that file.

Note that we have provided some example code in the if __name__ == '__main__' section of the file, which demonstrates how to use the load_wav and write_wav functions. This is a good place to put code for generating files or other quick tests.

Try using some similar code to create a reversed version of mystery.wav by: loading mystery.wav, calling backwards on it to produce a new sound, and saving that sound with a different filename (ending with .wav). If you listen to that new file, you might be able to interpret the secret message! snake emoji slight_smile emoji

Once you have that file, upload it in the box below to be checked for correctness:

Reversed mystery.wav:
 No file selected

5.2) Mixing Audio
Next, we'll look at mixing two sounds together to create a new sound. We'll implement this behavior as a function called mix. mix should take three inputs: two sounds (in our dictionary representation) and a "mixing parameter" 
 (a float such that 
).

The resulting sound should take 
 times the samples in the first sound and 
 times the samples in the second sound, adding them together to produce a new sound.

The two input sounds should have the same sampling rate. If you are provided with sounds of two different sampling rates, you should return None instead of returning a sound.

However, despite having the same sampling rate, the input sounds might have different durations. The length of the resulting sound should be the maximum of the lengths of the two input sounds, so that we are guaranteed a result where we can hear the entirety of both sounds (it would be jarring if one of the sounds cut off in the middle).

For example, consider the following two sounds:

Mixing them together with a mixing parameter 
, we hear the sound of a frustrated cat whose human is paying too much attention to a guitar and not enough to the cat....

Go ahead and implement mix in lab.py. As with the function above, mix should produce a new Python object representing the new sound, and it should not modify either of the sounds that are passed to it. After having implemented mix, you should pass the first 8 test cases in test.py. Note that the code in test.py is not only useful for checking your code; it can also be useful in understanding the input/output relationships we're expecting. For example, you may find it useful to take a look at the test_mix_small function in test.py, which shows the input/output relationships we're expecting. If you're having trouble understanding what test_mix_small is doing, or if you have other questions, please don't hesitate to ask for help.

As one example of a neat result, try mixing together synth.wav and water.wav with a mixing parameter of 
. Give this one a listen, and you should hear a sound mimicking what you would hear listening to some weird new-age music while standing next to a stream....

Once you have that file, upload it below to be checked for correctness.

Mixed synth and water:
 No file selected

5.3) Convolutional Filters
It turns out that a wide variety of interesting effects can be applied to audio using an operation known as convolution. By applying this operation to the samples in a sound and a "kernel" (another list of samples), we can achieve a wide variety of effects.

In its most concise mathematical form, convolution is usually expressed in the following way:

That is to say, the value 
 at sample number 
 in the output (
) can be computed using the sum on the right (where 
 represents the samples in the input sound and 
 represents the samples in the kernel).

This is a fine way to implement convolution (and you are welcome to do things this way if you please), but it is perhaps easier to think of convolution in a slightly different way. Our kernel is represented by a list of values. For each nonzero value 
 in our kernel, we create a copy of the samples in the input sound, shifted by 
 and scaled by 
; and adding these new lists of signals together give us our output. The total length of the output should be the length of the samples in the input sound, plus the length of the samples in the kernel, minus one.

For example, consider the following sound:

s = {
  'rate': 20,
  'samples': [3, 0, -2, 1, 0, 4]
}
and consider convolving this signal with the following kernel:

kernel = [2, 5, 0, 4]
Here, we'll walk through the process of computing the result of convolve(s, kernel), using the process described above. We know that our output is eventually going to have 9 samples in it (the length of the samples, plus the length of the kernel, minus 1).

The 2 at index 0 in the kernel contributes values to our output like the original samples scaled by 2 and shifted by 0: [6, 0, -4, 2, 0, 8, 0, 0, 0].

The 5 at index 1 contributes values to our output like the original samples scaled by 5 and shifted to the right by 1: [0, 15, 0, -10, 5, 0, 20, 0, 0].

The 0 at index 2 contributes nothing to our output.

The 4 at index 3 contributes values to our output like the original samples scaled by 4 and shifted to the right by 3: [0, 0, 0, 12, 0, -8, 4, 0, 16].

Adding the corresponding elements from each of those lists together, we get our overall result: [6, 15, -4, 4, 5, 0, 24, 0, 16]. These represent the samples of our output sound (which should have the same rate as the input).

We can summarize this process with the following table, which relates to the relevant parts of the original formula:

Index (
)\t
Input Samples (
)\t
Kernel Values (
)\t
shift by 
, scale by 
shift by 
, scale by 
shift by 
, scale by 
shift by 
, scale by 
Total (
, sum of columns)\t
Now, you give it a try, computing the result of the convolution described below by hand.
Consider the following sound:

s = {
    'rate': 30,
    'samples': [-5, 0, 2, 3, 4],
}
And the following kernel:

k = [0, 1, 0, 0, 3]
If we were to make a new sound via s2 = convolve(s, k), what should the value of s2['samples'] be?

Now implement the convolve function in lab.py. After it is correctly implemented, your code should pass the first 14 test cases from test.py.

Convolution might seem like a weird operation to want to perform, but it turns out to be central to a lot of common and interesting audio manipulations. One example of a kind of effect that can be achieved via convolution is a bass-boost effect, where low-frequency content in a sound is amplified.

We have provided a function called bass_boost_kernel(N, scale). Calling that function will produce a kernel that can be fed into your convolve function (along with a sound) to produce a new sound as output. The scale parameter affects the loudness of the low frequencies (scale=0 means no boosting at all, and larger values boost the low-frequency content more); the N parameter provides a way to control the frequencies that are boosted (N=0 will boost all frequencies roughly equally, and larger values allow more focus on the lowest frequencies in the input sound).

To test this functionality, use your convolve function to make a bass-boosted version of the ice_and_chilli.wav sound. When creating the kernel, use N=1000 and scale=1.5. Note that this operation may take quite a long while compared to the other files we've generated so far; feel free to grab a cup of tea while it's running slight_smile emoji coffee emoji. It might take a couple of minutes, depending on the computer you're running on.

Listen to the result, and compare it against the original ice_and_chilli.wav. Can you hear the difference? Note that the difference may be difficult to hear on laptop speakers; but it should be apparent if you use headphones or external speakers.

Upload the resulting file below to test for correctness:

Bass-boosted ice_and_chilli.wav:
 No file selected

5.4) Echo
Next, we'll implement a classic effect: an echo filter. We simulate an echo by starting with our original sound and adding one or more additional copies of the sound, each delayed by some amount and scaled down so as to be quieter.

We will implement this filter as a function called echo(sound, num_echoes, delay, scale). This function should take the following arguments:

sound: a dictionary representing the original sound
num_echoes: the number of additional copies of the sound to add
delay: the amount (in seconds) by which each "echo" should be delayed
scale: the amount by which each echo's samples should be scaled
A good first place to start is by determining how many samples each copy should be delayed by. To make sure your results are consistent with our checker, you should use Python's round function: sample_delay = round(delay * sound['rate']).

We should add in a delayed and scaled-down copy of the sound's samples (scaled by the given scale value and offset by sample_delay samples). Note that each new copy should be scaled down more than the one preceding it (the first should be multiplied by scale, the second by a total of scale**2, the third by a total of scale**3, and so on).

All told, the output should be num_echoes * sample_delay samples longer than the input in order to avoid cutting off any of the echoes.

As an example, consider the following piece of audio featuring a black-capped chickadee (Massachusetts' state bird):

If we invoke echo with this sound, 5 copies, a 0.6-second delay, and a scaling factor of 0.3, we end up with the following:

Consider the following sound:
s = {
    'rate': 8,
    'samples': [1, 2, 3, 4, 5],
}
If we were to make a new sound via s2 = echo(s, 1, 0.4, 0.2), what should the value of s2['samples'] be? Enter a Python list in the box below:

Consider the following sound:
s = {
    'rate': 8,
    'samples': [1, 2, 3, 4, 5],
}
If we were to make a new sound via s2 = echo(s, 2, 0.4, 0.2), what should the value of s2['samples'] be? Enter a Python list in the box below:

Implement the echo filter by filling in the definition of the echo function in lab.py. Note that echo should create a new sound and should not modify its inputs.

Note also that there are multiple ways to implement this function. One strategy would involve writing a brand-new echo function from scratch; but another would be to construct an appropriate filter and then use convolve to implement the echo.

After implementing echo, your code should pass the first 18 test cases from test.py.

When you have done so, try applying your echo filter to the sound in chord.wav, with 5 echoes, 0.3 seconds of delay between echoes, and a scaling factor of 0.6. Save the result as a WAV file, give it a listen, and upload it in the box below to check for correctness:

Echo-y chord.wav:
 No file selected
`
