/* jshint ignore:start */
'use strict';
/* jshint ignore:end */
/*jshint esversion: 6 */
/*globals $:false */
/*global  jasmine,expect,it,describe,allFeeds,beforeEach,loadFeed*/


/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against our application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(() => {
	//we increase the jasmine DEFAULT_TIMEOUT_INTERVAL for our async calls
	//so that jasmine has enough time to know the call got processed.
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds letiable in our application.
	 */
	describe('RSS Feeds', () => {
		/* This is our first test - it tests to make sure that the
		 * allFeeds letiable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* This is our second test-it loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('URL is defined and is not empty', () => {
			allFeeds.forEach((feed) => {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			});

		});


		/* This is our third test-it loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('name is defined and is not empty', () => {
			allFeeds.forEach((feed) => {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			});
		});

	});


	/* This is our second test suite -it is about the menu's element visibility and
	 *that menu-icon's funcionality*/
	describe('The menu', () => {
		let menuIcon=$('.menu-icon-link');
		let body=$('body');
		/*This tests ensures the menu element is
		 * hidden by default. */
		it('hides the menu element by default', () => {
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		/* This test ensures the menu changes
		 * visibility when the menu icon is clicked.*/
		it('appears the menu element when menu icon is clicked', () => {
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(false);

			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});

	/* This is our third test suite -it is about .feed container's entries after
	the first time that loadFeed is invoked */
	describe('Initial Entries', () => {
		beforeEach((done) => {
			loadFeed(0, () => {
				done();
			});
		});

		/*This test ensures tht when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.*/
		it('ensures that .feedcontainer is not empty after loadFeed', () => {
			expect($('.feed .entry').length).toBeGreaterThan(0);

		});
	});

	/* This is our third test suite -it is about loadFeeds content
	 after loading	new feed */
	describe('New Feed Selection', () => {
		let feed=$('.feed');

		/* This test ensures that,when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		let firstFeed, secondFeed;
		beforeEach((done) => {
			loadFeed(0,() => {
				firstFeed = feed.html();
				loadFeed(1 , ()=> {
					secondFeed = feed.html();
					done();
				});
			});
		});

		it('changes the content after loading new feed', () => {
			expect(firstFeed).not.toEqual(secondFeed);
		});
	});

});
