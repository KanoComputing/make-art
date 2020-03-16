/**
 * UpdateTask.cs
 * 
 * This task executes after the application is updated through the Microsoft 
 * Store. It's purpose is to handle any application migration/update scenarios.
 * It does not require task registration.
 * 
 * https://docs.microsoft.com/en-us/windows/uwp/launch-resume/run-a-background-task-during-updatetask
 */


using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Storage;

using KanoComputing.Display;


namespace MakeArt.BackgroundTasks {
    public sealed class UpdateTask : IBackgroundTask {

        private BackgroundTaskDeferral Deferral = null;

        public async void Run(IBackgroundTaskInstance taskInstance) {
            this.Deferral = taskInstance.GetDeferral();
            taskInstance.Canceled += new BackgroundTaskCanceledEventHandler(OnTaskCancelled);

            Debug.WriteLine("UpdateTask: Runnning...");

            try {
                await CleanUpBackgroundTasksAsync();
                CleanUpLocalSettings();

                // Configure the application to launch maximised for the first time.
                IWindowManager windowManager = new WindowManager();
                windowManager.MaximiseWindow();

                Debug.WriteLine("UpdateTask: Finished successfully");

            } catch (Exception e) {
                Debug.WriteLine("UpdateTask: Caught exception " + e.Message);
            } finally {
                // This must always be called, even if there is an exception.
                this.Deferral.Complete();
            }
        }

        private void OnTaskCancelled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason) {
            if (this.Deferral != null) {
                this.Deferral.Complete();
            }
            Debug.WriteLine("Background " + sender.Task.Name + " Cancel Requested...");
        }

        private async Task CleanUpBackgroundTasksAsync() {
            // Clean up all background tasks and re-register them back.
            BackgroundExecutionManager.RemoveAccess();
            TaskManager.UnregisterAllBackgroundTasks();
            await TaskManager.RegisterAllBackgroundTasksAsync(false);
        }

        private void CleanUpLocalSettings() {
            // Remove all stored data from local settings file.
            // Note: Clear() would just remove the collection and not the data.
            ApplicationDataContainer settings = ApplicationData.Current.LocalSettings;
            foreach (string key in settings.Values.Keys) {
                settings.Values.Remove(key);
            }
        }
    }
}
