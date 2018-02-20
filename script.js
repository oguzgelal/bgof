$(document).ready(function () {

	$('.input-area').keydown(function () { calculate($(this).val()); });
	$('.input-area').keyup(function () { calculate($(this).val()); });

	var calculate = function (text) {
		var letterCount = countLetters(text);
		var syllableCount = countSyllables(text);
		var wordCount = countWords(text);
		var wordCountsBySyl = countWordsBySyllables(text);
		var wordPercentsBySyl = {};
		Object.keys(wordCountsBySyl).map(function (k) {
			wordPercentsBySyl[k] = (wordCountsBySyl[k] / wordCount) * 100;
			if (isNaN(wordPercentsBySyl[k])) { wordPercentsBySyl[k] = 0; }
		});
		var sentenceCount = countSentences(text);
		var averageLength = isNaN(letterCount / sentenceCount) ? 0 : letterCount / sentenceCount;
		//var averageWordLength = countAverageWords(text);
		var atesman = 0, cetinkaya = 0;

		var A, B;
		if (wordCount != 0 && sentenceCount != 0) {
			A = isNaN(syllableCount / wordCount) ? 0 : syllableCount / wordCount;
			B = isNaN(wordCount / sentenceCount) ? 0 : wordCount / sentenceCount;
			// Atesman Denklemi
			atesman = 198.825;
			atesman -= A * 40.175;
			atesman -= B * 2.610;

			cetinkaya = 118.823;
			cetinkaya -= A * 25.987;
			cetinkaya -= B * 0.971;
		}

		$('.result-letters').html(letterCount);

		$('.result-syllables').html(syllableCount);
		$('.result-syllables-1').html('<span style="font-size: 11px;">%</span>' + wordPercentsBySyl['1w'].toFixed(0));
		$('.lisubp1').css('width', wordPercentsBySyl['1w'] + '%');
		$('.result-syllables-2').html('<span style="font-size: 11px;">%</span>' + wordPercentsBySyl['2w'].toFixed(0));
		$('.lisubp2').css('width', wordPercentsBySyl['2w'] + '%');
		$('.result-syllables-3').html('<span style="font-size: 11px;">%</span>' + wordPercentsBySyl['3w'].toFixed(0));
		$('.lisubp3').css('width', wordPercentsBySyl['3w'] + '%');
		$('.result-syllables-4').html('<span style="font-size: 11px;">%</span>' + wordPercentsBySyl['4pw'].toFixed(0));
		$('.lisubp4').css('width', wordPercentsBySyl['4pw'] + '%');

		$('.result-words').html(wordCount);
		$('.result-sentence').html(sentenceCount);
		$('.result-average').html(averageLength.toFixed(2));
		$('.result-average-words').html(A ? A.toFixed(2) : '0');

		$('.result-atesman').html(atesman.toFixed(5));
		$('.result-cetinkaya').html(cetinkaya.toFixed(5));
	};

	var countLetters = function (text) {
		var alphabet = /^[a-zA-ZÂâÎîİıÇçŞşÜüÖöĞğ]/;
		var cnt = 0;
		for (var i = 0; i < text.length; i++) {
			if (text[i].match(alphabet)) {
				cnt++;
			}
		}
		return cnt;
	};

	var countSyllables = function (text) {
		var vowels = 'AaÂâEeIıİiÎîOoÖöUuÜü';
		var cnt = 0;
		for (var i = 0; i < text.length; i++) {
			if (vowels.indexOf(text[i]) > -1) {
				cnt++;
			}
		}
		return cnt;
	};

	var countWordsBySyllables = function (text) {
		var counts = { '1w': 0, '2w': 0, '3w': 0, '4pw': 0 };
		$.trim(text).split(' ').map(function (item) {
			var sylCount = countSyllables(item);
			if (sylCount === 1) { counts['1w'] += 1; }
			if (sylCount === 2) { counts['2w'] += 1; }
			if (sylCount === 3) { counts['3w'] += 1; }
			if (sylCount >= 4) { counts['4pw'] += 1; }
		});
		return counts;
	};

	var countWords = function (text) {
		var cnt = 0;
		$.trim(text).split(' ').map(function (item) {
			if (item !== '' && item !== ' ') { cnt++; }
		});
		return cnt;
	};

	var countSentences = function (text) {
		var cnt = 0;
		$.trim(text).split('.').map(function (item) {
			if (item !== '' && item !== ' ') { cnt++; }
		});
		return cnt;
	};

	var countAverageWords = function (text) {
		var sum = 0;
		var count = 0;
		$.trim(text).split(' ').map(function (word) {
			console.log('-> word: ', word);
			sum += word.length;
			count++;
		});
		return sum / count;
	};

	calculate($('.input-area').val());

});
