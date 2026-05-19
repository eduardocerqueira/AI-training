from my_project_name.main import main


def test_main_runs(capsys) -> None:
    main()
    assert "Hello" in capsys.readouterr().out
