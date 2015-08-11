<!DOCTYPE html>
<html>
<head>
	<title>Selectator Plugin</title>
	<link rel="stylesheet" href="fm.selectator.jquery.css"/>
	<style>
		body {
			font-family: sans-serif;
			margin: 0;
			padding: 0;
		}
		label {
			display: block;
			margin-bottom: 5px;
		}
		#wrapper {
			padding: 15px;
		}
		#select1 {
			width: 250px;
			padding: 7px 10px;
		}
	</style>
	<script src="jquery-1.11.0.min.js"></script>
	<script src="fm.selectator.jquery.js"></script>
	<script>
		$(function () {
			var $activate_selectator1 = $('#activate_selectator1');
			$activate_selectator1.click(function () {
				var $select1 = $('#select1');
				if ($select1.data('selectator') === undefined) {
					$select1.selectator({
						labels: {
							search: 'Search here...'
						}
					});
					$activate_selectator1.val('destroy selectator');
				} else {
					$select1.selectator('destroy');
					$activate_selectator1.val('activate selectator');
				}
			});
			$activate_selectator1.trigger('click');

		});
	</script>
</head>
<body>
	<div id="wrapper">
		<label for="select1">
			Singular select with custom content:
		</label>
		<select id="select1" name="select1">
			<option value="">&nbsp;</option>
			<option value="1" data-subtitle="Et" data-left="<img src='images/ingi.png'>" data-right="1">One</option>
			<option value="2" data-subtitle="To" data-left="<img src='images/runa.png'>" data-right="2">Two</option>
			<option value="3" data-subtitle="Tre" data-left="<img src='images/jogvan.png'>" data-right="3">Three</option>
			<option value="4" data-left="<img src='images/noimage.png'>" data-right="4">Four</option>
			<option value="5" data-left="<img src='images/noimage.png'>" data-right="5">Five</option>
			<option value="6">Six</option>
			<option value="7">Seven</option>
			<option value="8">Eight</option>
			<option value="9">Nine</option>
			<option value="10">Ten</option>
			<option value="11">Eleven</option>
			<option value="12">Twelve</option>
			<option value="13">Thirteen</option>
			<option value="14">Fourteen</option>
			<option value="15">Fifteen</option>
			<option value="16">Sixteen</option>
			<option value="17">Seventeen</option>
			<option value="18">Eighteen</option>
			<option value="19">Nineteen</option>
			<option value="20">Twenty</option>
			<option value="21">Twenty-one</option>
			<option value="22">Twenty-two</option>
			<option value="23">Twenty-three</option>
			<option value="24">Twenty-four</option>
			<option value="25">Twenty-five</option>
			<option value="26">Twenty-six</option>
			<option value="27">Twenty-seven</option>
			<option value="28">Twenty-eight</option>
			<option value="29">Twenty-nine</option>
			<option value="30">Thirty</option>
			<?php
			for ($i = 31; $i < 2000; $i++) {
				?>
				<option value="<?=$i?>">Number <?=$i?></option>
				<?php
			}
			?>
		</select>
		<input value="activate selectator" id="activate_selectator1" type="button">
		<br>
		<br>

	</div>

</body>
</html>