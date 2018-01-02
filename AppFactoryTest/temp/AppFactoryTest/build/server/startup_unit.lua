local runUnitTests = function ()
	local testresults = ""
	local unittests = getunittests()

	local total, passed, failed = 0, 0, 0
	for i, j in pairs(unittests) do
		total = total + 1
		testresults = testresults .. "\nTest: " .. i
	
		local status, tag, mesg = pcall(j)
		if (status) then
			passed = passed + 1
			testresults = testresults .. " " .. "Passed"
		else
			failed = failed + 1
			testresults = testresults .. " " .. "Failed at " .. tag .. " with Error: " .. mesg
		end
	end

	print(testresults)
	print("\nTotal tests: " .. total .. " Passed: " .. passed .. " Failed: " .. failed)
end

runUnitTests()
